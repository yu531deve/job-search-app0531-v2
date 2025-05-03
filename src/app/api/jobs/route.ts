import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM jobs");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("❌ DB取得エラー:", error);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, salary, description } = body;

    const result = await pool.query(
      "INSERT INTO jobs (title, category, salary, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, category, salary, description]
    );

    return NextResponse.json(
      { success: true, job: result.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ 登録エラー:", error);
    return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
  }
}
