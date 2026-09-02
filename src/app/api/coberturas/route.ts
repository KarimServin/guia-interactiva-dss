import { NextResponse } from 'next/server';
import { PLANES_COMPARATIVE_DATA } from '@/data/dssData';

export const revalidate = 0; // Fresh data fetch

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      count: PLANES_COMPARATIVE_DATA.length,
      updatedAt: new Date().toISOString(),
      data: PLANES_COMPARATIVE_DATA
    });
  } catch (error: any) {
    console.error('Error fetching coberturas API:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
