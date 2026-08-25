import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// Memory cache
let cachedData: any[] | null = null;
let lastFetched = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes (short TTL to ensure auto-updating from Google Sheets)

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1vfq5HlAMR0R-hZymeFdXCZTsZAPGO20v/export?format=csv&gid=579795149';
const FALLBACK_FILE_PATH = path.join(process.cwd(), 'src/data/medicos_fallback.json');

// Helper to parse CSV
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
        i++; // skip next quote
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
  
  // Return from memory cache if valid
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

    // Skip the first row if it is the title row, e.g. "PADRON DE PROFESIONALES"
    let startIndex = 0;
    if (rows[0] && rows[0][0] && rows[0][0].includes("PADRON DE PROFESIONALES")) {
      startIndex = 1; // start looking at headers on index 1
    }

    const headers = rows[startIndex];
    if (!headers || headers.length < 2) {
      throw new Error("Invalid CSV header row");
    }

    // Map headers to indices
    const headerIndices = {
      nombre: headers.findIndex(h => h.trim().toUpperCase() === 'NOMBRE'),
      matricula: headers.findIndex(h => h.trim().toUpperCase() === 'MATRICULA'),
      especialidad: headers.findIndex(h => h.trim().toUpperCase() === 'ESPECIALIDAD'),
      direccion: headers.findIndex(h => h.trim().toUpperCase() === 'DIRECCION'),
      telefono: headers.findIndex(h => h.trim().toUpperCase() === 'TELEFONO'),
      cp: headers.findIndex(h => h.trim().toUpperCase() === 'CP'),
      localidad: headers.findIndex(h => h.trim().toUpperCase() === 'LOCALIDAD'),
    };

    const providers: any[] = [];
    
    // Parse records starting after header index
    for (let i = startIndex + 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 2) continue; // Skip empty/invalid lines
      
      const getVal = (idx: number) => {
        if (idx === -1 || idx >= row.length) return '';
        return row[idx].trim();
      };

      const name = getVal(headerIndices.nombre);
      if (!name || name.toUpperCase() === 'NOMBRE') continue; // skip duplicates or empty names

      // Clean up fields
      let specialty = getVal(headerIndices.especialidad);
      if (specialty.endsWith(',')) {
        specialty = specialty.slice(0, -1).trim();
      }

      const locality = getVal(headerIndices.localidad);

      // Determine if it is a clinic/sanatorium or emergency guard
      const lowerName = name.toLowerCase();
      const lowerSpec = specialty.toLowerCase();
      const isEmergencyGuard = lowerName.includes('sanatorio') || 
                               lowerName.includes('clinica') || 
                               lowerName.includes('guardia') || 
                               lowerSpec.includes('guardia') ||
                               lowerSpec.includes('urgencia');

      providers.push({
        id: `p-${i}`,
        name,
        matricula: getVal(headerIndices.matricula) || undefined,
        specialty: specialty || 'Médico',
        address: getVal(headerIndices.direccion),
        phone: getVal(headerIndices.telefono),
        cp: getVal(headerIndices.cp) || undefined,
        locality: locality,
        city: locality, // Map to city for compatibility with types
        isEmergencyGuard
      });
    }

    if (providers.length > 0) {
      cachedData = providers;
      lastFetched = now;

      // Write to fallback file asynchronously
      try {
        fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(providers, null, 2), 'utf-8');
      } catch (err) {
        console.error("Failed to write fallback cache file:", err);
      }

      return NextResponse.json({ source: 'network', data: providers });
    }

  } catch (error: any) {
    console.error("Error fetching or parsing sheets data:", error);
  }

  // Fallback to local JSON file if fetch fails
  try {
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const fileData = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8');
      const providers = JSON.parse(fileData);
      cachedData = providers;
      lastFetched = now;
      return NextResponse.json({ source: 'fallback-file', data: providers });
    }
  } catch (err) {
    console.error("Failed to read fallback file:", err);
  }

  return NextResponse.json({ error: "Failed to load providers" }, { status: 500 });
}
