// app/api/data/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    // PostgreSQL
    const pgResult = await query("SELECT id, email FROM users LIMIT 10");

    // Supabase
    const { data: supaData, error } = await supabaseAdmin
      .from("ads")
      .select("*")
      .limit(10);

    if (error) throw error;

    return NextResponse.json({
      postgres: pgResult.rows,
      supabase: supaData,
    });
  } catch (err) {
    console.error("DB query error:", err);
    return NextResponse.json({ error: "internal_server_error" }, { status: 500 });
  }
}
