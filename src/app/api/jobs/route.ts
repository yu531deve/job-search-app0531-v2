import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET: 求人詳細の取得
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [
      params.id,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "求人が見つかりません。" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GETエラー:", error);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

// PATCH: お気に入りトグルの更新
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { is_favorite } = body;

    const result = await pool.query(
      "UPDATE jobs SET is_favorite = $1 WHERE id = $2 RETURNING *",
      [is_favorite, params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "更新対象が見つかりません。" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("PATCHエラー:", error);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
