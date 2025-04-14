// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  console.log("✅ redirecting to /jobs"); // ← このログ追加
  redirect("/jobs");
}
