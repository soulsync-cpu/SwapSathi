import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { query as pgQuery } from "@/lib/db";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("ads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (supabaseError) {
    console.warn("Supabase GET failed, falling back to PostgreSQL:", supabaseError);

    try {
      const result = await pgQuery(
        "SELECT id, created_at, type, asset, price, min_amount, max_amount, payment_method, description, telegram_handle, user_id, title FROM ads ORDER BY created_at DESC LIMIT 100"
      );
      return NextResponse.json(result.rows);
    } catch (pgError) {
      console.error("PostgreSQL GET failed:", pgError);
      return NextResponse.json([], { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      type,
      asset,
      price,
      min_amount,
      max_amount,
      payment_method,
      description,
      telegram_handle,
      user_id,
      title,
    } = await req.json();

    const created_at = new Date().toISOString();

    const newAd = {
      type,
      asset,
      price,
      min_amount,
      max_amount,
      payment_method,
      description,
      telegram_handle,
      user_id,
      title,
      created_at,
    };

    // Supabase insert
    const { error: supaError } = await supabaseAdmin.from("ads").insert([newAd]);
    if (supaError) throw supaError;

    // PostgreSQL fallback
    await pgQuery(
      `INSERT INTO ads 
        (type, asset, price, min_amount, max_amount, payment_method, description, telegram_handle, user_id, title, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        type, asset, price, min_amount, max_amount, payment_method, description, telegram_handle, user_id, title, created_at,
      ]
    );

    return NextResponse.json({ message: "Ad created" }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Failed to create ad" }, { status: 500 });
  }
}
