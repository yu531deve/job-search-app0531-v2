import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_req: NextRequest, context: any) {
  const id = context.params.id;

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
