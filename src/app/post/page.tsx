"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    salary: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = {
      title: formData.title,
      category: formData.category,
      salary: Number(formData.salary),
      description: formData.description,
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("投稿エラー:", error);
      alert("投稿に失敗しました");
    } else {
      alert("投稿が完了しました");
      router.push("/jobs");
    }
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="bg-slate-700 text-white px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">求人検索アプリ</h1>
          <nav className="space-x-6 text-sm">
            <Link href="/" className="hover:underline">
              求人検索
            </Link>
            <Link href="/post" className="hover:underline">
              求人投稿
            </Link>
          </nav>
        </div>
      </header>

      {/* 投稿フォーム本体 */}
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <h1 className="text-xl font-bold text-gray-800 mb-6">求人投稿</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          {/* カテゴリ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              求人カテゴリ選択
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            >
              <option value="" disabled>
                カテゴリを選択
              </option>
              <option value="エンジニア">エンジニア</option>
              <option value="デザイン">デザイン</option>
              <option value="マーケティング">マーケティング</option>
              <option value="営業">営業</option>
              <option value="人事">人事</option>
              <option value="医療・介護">医療・介護</option>
              <option value="カスタマーサポート">カスタマーサポート</option>
              <option value="その他">その他</option>
            </select>
          </div>

          {/* 年収 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年収（万円）
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          {/* タイトル */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              求人タイトル
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              memo
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              rows={4}
              required
            />
          </div>

          {/* 投稿ボタン */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded px-6 py-2 text-sm hover:bg-blue-600 transition"
            >
              投稿
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
