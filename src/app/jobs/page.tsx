"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
  description: string;
  is_favorite: boolean;
};

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [minSalary, setMinSalary] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    const data = await res.json();

    console.log("🔍 APIからのデータ:", data);

    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleFavorite = async (id: number, isFavorite: boolean) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_favorite: !isFavorite }),
    });

    if (!res.ok) {
      console.error("お気に入り更新エラー");
    } else {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === id ? { ...job, is_favorite: !isFavorite } : job
        )
      );
    }
  };

  const removeNonFavorites = async () => {
    const res = await fetch("/api/jobs", {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("削除エラー");
    } else {
      await fetchJobs();
    }
  };

  const categories = [
    "エンジニア",
    "デザイン",
    "マーケティング",
    "営業",
    "人事",
    "医療・介護",
    "カスタマーサポート",
    "その他",
  ];

  const filteredJobs = jobs.filter((job) => {
    const salaryMatch = !minSalary || job.salary >= Number(minSalary);
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    return salaryMatch && categoryMatch;
  });

  return (
    <div className="flex">
      {/* フィルタ */}
      <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-green-600">
          求人カテゴリ
        </h3>
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center mb-2 text-gray-600"
          >
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategories((prev) =>
                  prev.includes(value)
                    ? prev.filter((c) => c !== value)
                    : [...prev, value]
                );
              }}
              className="mr-2 accent-green-500"
            />
            {category}
          </label>
        ))}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-green-600">年収</h3>
          <select
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 shadow-sm"
          >
            <option value="">指定なし</option>
            <option value="300">300万円以上</option>
            <option value="500">500万円以上</option>
            <option value="700">700万円以上</option>
            <option value="1000">1000万円以上</option>
          </select>
        </div>

        {/* 投稿ボタン */}
        <div className="mt-6 text-center">
          <Link
            href="/post"
            className="inline-block bg-green-500 text-white font-semibold rounded-full px-4 py-2 hover:bg-green-600 transition shadow-lg"
          >
            + 新しい求人を投稿
          </Link>
        </div>

        {/* 削除ボタン（次ステップで実装） */}
        <div className="mt-4 text-center">
          <button
            className="inline-block bg-red-500 text-white font-semibold rounded-full px-4 py-2 hover:bg-red-700 transition shadow-lg"
            onClick={removeNonFavorites}
          >
            お気に入り以外を削除
          </button>
        </div>
      </div>

      {/* 求人一覧 */}
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">求人一覧</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="relative block border rounded-lg shadow hover:shadow-lg transition-all p-4 bg-white"
              >
                <button
                  onClick={() => toggleFavorite(job.id, job.is_favorite)}
                  className="absolute top-2 right-2 text-yellow-400 text-2xl"
                >
                  {job.is_favorite ? "★" : "☆"}
                </button>

                <Link href={`/jobs/${job.id}`} className="block">
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-gray-700 mb-1">カテゴリ: {job.category}</p>
                  <p className="text-gray-700">年収: {job.salary}万円</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-700 col-span-3 text-center">
              該当する求人が見つかりません。
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
