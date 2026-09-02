import { NextResponse } from 'next/server';
import { PLANES_COMPARATIVE_DATA } from '@/data/dssData';

export const revalidate = 0; // Fresh response

export async function GET() {
  try {
    // Extract prestacion and carencia directly from Coberturas y Planes dataset
    const carencias = PLANES_COMPARATIVE_DATA.map(item => ({
      prestacion: item.prestacion,
      carencia: item.carencia,
      category: item.category
    }));

    return NextResponse.json({
      success: true,
      count: carencias.length,
      updatedAt: new Date().toISOString(),
      data: carencias
    });
  } catch (error: any) {
    console.error('Error in /api/carencias GET:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
