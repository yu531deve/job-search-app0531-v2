import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string | string[]> }
) {
  const id = Array.isArray(context.params.id)
    ? context.params.id[0]
    : context.params.id;

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
