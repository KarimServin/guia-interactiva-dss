import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", app: "DSS Santa Fe Interactive Guide (Next.js)" });
}
