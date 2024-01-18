import Pagination from "@/components/book/pagination";
import Interviews from "@/components/interview/interviews";
import SearchBar from "@/components/interview/searchbar";
import { fetchInterviewsPages } from "@/lib/data/interview";
import { formatedQuery } from "@/lib/utils";
import React from "react";

export default async function InterviewsPage({
  searchParams,
}: {
  searchParams: { query?: string; limit?: string };
}) {
  const query = formatedQuery(searchParams);
  const { success, totalPages } = await fetchInterviewsPages({ query });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <SearchBar className="flex w-full max-w-2xl rounded-2xl bg-slate-100 p-3 shadow-xl" />
      <Interviews query={query} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
