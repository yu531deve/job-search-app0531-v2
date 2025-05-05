import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  try {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "求人が見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("❌ DB取得エラー:", error);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}
