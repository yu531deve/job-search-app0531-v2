import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } } // ← この形式に戻します
) {
  const { id } = params;

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
