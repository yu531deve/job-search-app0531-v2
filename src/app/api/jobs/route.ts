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

export async function POST(req: Request) {
  const body = await req.json();

  const { title, category, salary, description } = body;

  const { data, error } = await supabase.from("jobs").insert([
    {
      title,
      category,
      salary,
      description,
    },
  ]);

  if (error) {
    console.error("Supabase登録エラー:", error);
    return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
  }

  return NextResponse.json({ success: true, job: data?.[0] }, { status: 200 });
}
