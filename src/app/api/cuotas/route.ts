import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable cache so it always fetches real-time data

const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1_YkrWq_vuJj7iMbomTEQJzcccnvAUh6Z0X-bPX7Ewqo/export?format=csv&gid=0';
const SPREADSHEET_VIEW_URL = 'https://docs.google.com/spreadsheets/d/1_YkrWq_vuJj7iMbomTEQJzcccnvAUh6Z0X-bPX7Ewqo/edit?gid=0#gid=0';

function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      if (currentRow.some(cell => cell.length > 0)) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some(cell => cell.length > 0)) {
      lines.push(currentRow);
    }
  }

  return lines;
}

export async function GET() {
  try {
    const res = await fetch(SPREADSHEET_CSV_URL, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch spreadsheet: ${res.statusText}`);
    }

    const csvText = await res.text();
    const rawGrid = parseCSV(csvText);

    // Parse the grid structure into logical sections
    // Expecting rows:
    // Row 0: Group Headers (Matrícula Activa, Mantenimiento Matrícula)
    // Row 1: Subheaders (Cuota Plan Básico, Total, Emerg, C/Emerg, Total, Emerg., C/Emerg.)
    // Following rows: Section title OR data rows

    const sections: Array<{
      title: string;
      rows: Array<{
        categoria: string;
        activa: { total: string; emerg: string; conEmerg: string };
        mantenimiento: { total: string; emerg: string; conEmerg: string };
      }>;
    }> = [];

    let currentSectionTitle = 'Cuotas y Valores';
    let currentRows: Array<{
      categoria: string;
      activa: { total: string; emerg: string; conEmerg: string };
      mantenimiento: { total: string; emerg: string; conEmerg: string };
    }> = [];

    // Process from Row 1 onwards
    for (let r = 1; r < rawGrid.length; r++) {
      const row = rawGrid[r];
      const col0 = row[0] || '';
      const col1 = row[1] || '';

      // Skip empty rows
      if (!col0 && !col1) continue;

      // If col0 starts with "Cuota Plan" or "Cuota Jubilado" or similar section title, and col1 is empty
      if (col0.toLowerCase().startsWith('cuota') && (!col1 || col1 === 'Total' || col1 === '')) {
        if (col1 === 'Total') {
          // This is the header row for Plan Básico: e.g., ["Cuota Plan Básico", "Total", ...]
          currentSectionTitle = col0;
          currentRows = [];
          sections.push({ title: currentSectionTitle, rows: currentRows });
        } else {
          // New section header row, e.g. ["Cuota Plan General", "", ...]
          currentSectionTitle = col0;
          currentRows = [];
          sections.push({ title: currentSectionTitle, rows: currentRows });
        }
      } else if (col0 && (col0 === 'Titular' || col0 === 'Cónyuge' || col0.startsWith('Hijo') || col0.length > 0)) {
        // Data row
        const rowData = {
          categoria: col0,
          activa: {
            total: row[1] || '-',
            emerg: row[2] || '-',
            conEmerg: row[3] || '-'
          },
          mantenimiento: {
            total: row[4] || '-',
            emerg: row[5] || '-',
            conEmerg: row[6] || '-'
          }
        };

        if (sections.length === 0) {
          sections.push({ title: 'Cuota Plan Básico', rows: [rowData] });
        } else {
          sections[sections.length - 1].rows.push(rowData);
        }
      }
    }

    return NextResponse.json({
      success: true,
      updatedAt: new Date().toISOString(),
      sheetUrl: SPREADSHEET_VIEW_URL,
      rawGrid,
      sections
    });
  } catch (error: any) {
    console.error('Error fetching cuotas spreadsheet:', error);
    
    // Static Fallback in case Google Sheets is unavailable or offline
    const fallbackGrid = [
      ["", "Matrícula Activa", "", "", "Mantenimiento Matrícula", "", ""],
      ["Cuota Plan Básico", "Total", "Emerg", "C/Emerg", "Total", "Emerg.", "C/Emerg."],
      ["Titular", "$146.693,00", "$3.816,00", "$150.509,00", "$189.368,50", "$3.816,00", "$193.184,50"],
      ["Cónyuge", "$129.674,00", "$3.816,00", "$133.490,00", "$168.081,50", "$3.816,00", "$171.897,50"],
      ["Hijo/a", "$62.933,00", "$3.816,00", "$66.749,00", "$86.757,00", "$3.816,00", "$90.573,00"],
      ["Cuota Plan General", "", "", "", "", "", ""],
      ["Titular", "$237.295,00", "$3.816,00", "$241.111,00", "$325.271,50", "$3.816,00", "$325.271,50"],
      ["Cónyuge", "$211.216,00", "$3.816,00", "$215.032,00", "$290.394,50", "$3.816,00", "$294.210,50"],
      ["Hijo/a", "$113.513,00", "$3.816,00", "$117.329,00", "$162.627,00", "$3.816,00", "$166.443,00"],
      ["Cuota Jubilado (Cualquier plan)", "", "", "", "", "", ""],
      ["Titular", "$62.524,00", "$3.816,00", "$66.340,00", "", "", ""]
    ];

    return NextResponse.json({
      success: false,
      isFallback: true,
      error: error.message,
      updatedAt: new Date().toISOString(),
      sheetUrl: SPREADSHEET_VIEW_URL,
      rawGrid: fallbackGrid,
      sections: [
        {
          title: "Cuota Plan Básico",
          rows: [
            { categoria: "Titular", activa: { total: "$146.693,00", emerg: "$3.816,00", conEmerg: "$150.509,00" }, mantenimiento: { total: "$189.368,50", emerg: "$3.816,00", conEmerg: "$193.184,50" } },
            { categoria: "Cónyuge", activa: { total: "$129.674,00", emerg: "$3.816,00", conEmerg: "$133.490,00" }, mantenimiento: { total: "$168.081,50", emerg: "$3.816,00", conEmerg: "$171.897,50" } },
            { categoria: "Hijo/a", activa: { total: "$62.933,00", emerg: "$3.816,00", conEmerg: "$66.749,00" }, mantenimiento: { total: "$86.757,00", emerg: "$3.816,00", conEmerg: "$90.573,00" } }
          ]
        },
        {
          title: "Cuota Plan General",
          rows: [
            { categoria: "Titular", activa: { total: "$237.295,00", emerg: "$3.816,00", conEmerg: "$241.111,00" }, mantenimiento: { total: "$325.271,50", emerg: "$3.816,00", conEmerg: "$325.271,50" } },
            { categoria: "Cónyuge", activa: { total: "$211.216,00", emerg: "$3.816,00", conEmerg: "$215.032,00" }, mantenimiento: { total: "$290.394,50", emerg: "$3.816,00", conEmerg: "$294.210,50" } },
            { categoria: "Hijo/a", activa: { total: "$113.513,00", emerg: "$3.816,00", conEmerg: "$117.329,00" }, mantenimiento: { total: "$162.627,00", emerg: "$3.816,00", conEmerg: "$166.443,00" } }
          ]
        },
        {
          title: "Cuota Jubilado (Cualquier plan)",
          rows: [
            { categoria: "Titular", activa: { total: "$62.524,00", emerg: "$3.816,00", conEmerg: "$66.340,00" }, mantenimiento: { total: "-", emerg: "-", conEmerg: "-" } }
          ]
        }
      ]
    });
  }
}
