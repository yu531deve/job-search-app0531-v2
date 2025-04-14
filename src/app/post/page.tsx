"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function PostJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    salary: "",
    description: "",
    isFavorite: false,
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
      is_favorite: formData.isFavorite,
    };

    const { error } = await supabase.from("jobs").insert([newJob]);

    if (error) {
      console.error("投稿エラー:", error.message);
      alert("投稿に失敗しました");
    } else {
      alert("投稿が完了しました");
      router.push("/jobs");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-6">求人情報を投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* タイトル */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            タイトル
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        {/* カテゴリ */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            カテゴリ
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          >
            <option value="" disabled>
              選択してください
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

        {/* 給与 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            給与 (万円単位)
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            min="0"
            required
          />
        </div>

        {/* 説明 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">説明</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            rows={4}
            required
          />
        </div>

        {/* お気に入り登録 */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isFavorite"
              checked={formData.isFavorite}
              onChange={handleChange}
              className="accent-green-500"
            />
            お気に入り登録する
          </label>
        </div>

        {/* 投稿ボタン */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          投稿する
        </button>
      </form>
    </div>
  );
}
