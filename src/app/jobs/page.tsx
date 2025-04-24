"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
  description: string;
};

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [minSalary, setMinSalary] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    const data = await res.json();

    console.log("🔍 APIからのデータ:", data);

    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      <header className="bg-slate-700 text-white px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">求人検索アプリ</h1>
          <nav className="space-x-6 flex">
            <Link href="/" className="hover:underline">
              求人検索
            </Link>
            <Link href="/post" className="hover:underline">
              求人投稿
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex min-h-screen bg-gray-50">
        {/* サイドバー */}
        <div className="basis-1/4 shrink-0 min-h-screen bg-slate-100 px-4 py-6">
          {/* 求人カテゴリ */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              求人カテゴリ
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center text-sm text-gray-800"
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
                    className="mr-2 accent-blue-600"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* 年収セレクトボックス */}
          <div>
            <h3 className="text-sm font-bold  mt-8 text-gray-800 mb-2">年収</h3>
            <select
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1 text-sm text-gray-800 bg-white shadow-inner"
            >
              <option value="">指定なし</option>
              <option value="300">300万円以上</option>
              <option value="500">500万円以上</option>
              <option value="700">700万円以上</option>
              <option value="1000">1000万円以上</option>
            </select>
          </div>
        </div>

        {/* 求人一覧 */}
        <div className="basis-3/4 px-6 py-6">
          <div className="flex-1 px-0 py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">求人一覧</h1>
            <p className="text-sm text-gray-600 mb-6">
              {filteredJobs.length}件の求人が見つかりました
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* ← 以下カード一覧はこのままでOK */}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="relative block border rounded-xl shadow-md hover:shadow-lg transition-all p-6 bg-white"
                >
                  <div className="block space-y-2 cursor-default select-none pointer-events-none">
                    {/*<Link href={`/jobs/${job.id}`} className="block space-y-2">*/}
                    <h2 className="text-lg font-bold text-gray-900">
                      {job.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      カテゴリ: {job.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      年収: {job.salary}万円
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-700 col-span-3 text-center">
                該当する求人が見つかりません。
              </p>
            )}
          </div>
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({
              length: Math.ceil(filteredJobs.length / jobsPerPage),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
