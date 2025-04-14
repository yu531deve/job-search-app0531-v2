import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JobDetailPage = async (props: any) => {
  const { id } = props.params;

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
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

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow bg-white">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-700 text-lg mb-2">
        <span className="font-semibold">カテゴリ:</span> {data.category}
      </p>
      <p className="text-gray-700 text-lg mb-2">
        <span className="font-semibold">年収:</span> {data.salary}万円
      </p>
      <p className="text-gray-700 mt-4">{data.description || "説明なし"}</p>

      {/* 戻るボタン */}
      <Link
        href="/jobs"
        className="mt-6 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        戻る
      </Link>
    </div>
  );
};

export default JobDetailPage;
