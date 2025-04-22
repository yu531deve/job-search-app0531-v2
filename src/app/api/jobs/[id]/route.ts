import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// VercelでもESLintでも通る形式（型エラーを防ぎつつ通す）
export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "求人が見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
