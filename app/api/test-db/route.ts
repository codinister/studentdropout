
import { NextResponse } from "next/server";

import { db } from "@/db";

export async function GET() {
  try {
    const result = await db.$queryRaw`SELECT NOW()`;
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
