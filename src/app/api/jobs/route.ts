import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // ← JS SDK 経由に変更！

export async function GET() {
  const { data, error } = await supabase.from("jobs").select("*");

  if (error) {
    console.error("Supabase取得エラー:", error);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }

  return NextResponse.json(data); // ← 直接配列を返す！
}
