import postgres from "postgres";
import "dotenv/config";

const sql = postgres({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("✅ 接続成功！", result);
  } catch (err) {
    console.error("❌ 接続失敗:", err);
  } finally {
    await sql.end();
  }
}

testConnection();
