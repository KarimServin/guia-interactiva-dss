import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

let cachedData: any[] | null = null;
let lastFetched = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1QagCFXNKl7lNKUGbOiznQa3ukuKeWZEO/export?format=csv';
const FALLBACK_FILE_PATH = path.join(process.cwd(), 'src/data/anticonceptivos_fallback.json');

function parseCSV(text: string) {
  const lines: string[][] = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push("");
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') {
        i++;
      }
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }
  return lines;
}

export async function GET() {
  const now = Date.now();
  
  if (cachedData && (now - lastFetched < CACHE_TTL)) {
    return NextResponse.json({ source: 'memory', data: cachedData });
  }

  try {
    const res = await fetch(SHEET_CSV_URL, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch sheet: ${res.statusText}`);
    }

    const csvText = await res.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      throw new Error("Empty CSV response");
    }

    // Find the header row dynamically
    let headerRowIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i] && rows[i].some(cell => cell.trim().toUpperCase() === 'PRODUCTO')) {
        headerRowIdx = i;
        break;
      }
    }

    if (headerRowIdx === -1) {
      throw new Error("Could not find headers row containing 'Producto'");
    }

    const headers = rows[headerRowIdx].map(h => h.trim().toUpperCase());
    
    // Find column indexes
    const idxProducto = headers.findIndex(h => h === 'PRODUCTO');
    const idxLaboratorio = headers.findIndex(h => h === 'LABORATORIO');
    const idxTroquel = headers.findIndex(h => h === 'TROQUEL');
    const idxDrogas = headers.findIndex(h => h === 'NOMBRESDROGAS' || h === 'NOMBRES DROGAS');
    const idxAcciones = headers.findIndex(h => h === 'ACCIONES TERAPÉUTICAS' || h === 'ACCIONES TERAPEUTICAS');

    if (idxProducto === -1 || idxLaboratorio === -1 || idxTroquel === -1 || idxDrogas === -1 || idxAcciones === -1) {
      throw new Error(`Header mismatch. Found headers: ${headers.join(', ')}`);
    }

    const items: any[] = [];
    for (let i = headerRowIdx + 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 4) continue;

      const producto = row[idxProducto]?.trim();
      const laboratorio = row[idxLaboratorio]?.trim();
      const troquel = row[idxTroquel]?.trim();
      const drogas = row[idxDrogas]?.trim();
      const acciones = row[idxAcciones]?.trim();

      if (!producto && !laboratorio && !troquel && !drogas && !acciones) continue;

      items.push({
        producto: producto || '',
        laboratorio: laboratorio || '',
        troquel: troquel || '',
        drogas: drogas || '',
        acciones: acciones || ''
      });
    }

    if (items.length > 0) {
      cachedData = items;
      lastFetched = now;

      try {
        fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(items, null, 2), 'utf-8');
      } catch (err) {
        console.error("Failed to write fallback cache file:", err);
      }

      return NextResponse.json({ source: 'network', data: items });
    }
  } catch (error: any) {
    console.error("Error fetching or parsing anticonceptivos:", error);
  }

  // Fallback
  try {
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const fileData = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8');
      const items = JSON.parse(fileData);
      cachedData = items;
      lastFetched = now;
      return NextResponse.json({ source: 'fallback-file', data: items });
    }
  } catch (err) {
    console.error("Failed to read fallback file:", err);
  }

  return NextResponse.json({ error: "Failed to load anticonceptivos" }, { status: 500 });
}
