"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
  description: string;
};

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("取得エラー");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("詳細取得失敗:", err);
        setError(true);
      }
    };

    fetchJob();
  }, [id]);

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">求人情報が見つかりません。</h1>
        <p className="text-gray-700">URLが間違っている可能性があります。</p>
        <Link
          href="/jobs"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          戻る
        </Link>
      </div>
    );
  }

  if (!job) {
    return <p className="text-gray-600 p-4">読み込み中...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow bg-white">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 text-lg mb-2">
        <span className="font-semibold">カテゴリ:</span> {job.category}
      </p>
      <p className="text-gray-700 text-lg mb-2">
        <span className="font-semibold">年収:</span> {job.salary}万円
      </p>
      <p className="text-gray-700 mt-4">{job.description || "説明なし"}</p>

      <Link
        href="/jobs"
        className="mt-6 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        戻る
      </Link>
    </div>
  );
}
