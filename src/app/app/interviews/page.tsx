import Pagination from "@/components/ui/pagination";
import Interviews from "@/components/interview/interviews";
import SearchBar from "@/components/interview/searchbar";
import { fetchInterviewsPages } from "@/lib/data/interview";
import { formatedQuery } from "@/lib/utils";
import React, { Suspense } from "react";
import TableSkeleton from "@/components/interview/interviews-skeleton";

export default async function InterviewsPage({
  searchParams,
}: {
  searchParams: { query?: string; limit?: string };
}) {
  const query = formatedQuery(searchParams);
  const { totalPages } = await fetchInterviewsPages({ query });

  return (
    <div className="flex h-full w-full max-w-3xl flex-col items-center justify-center gap-5">
      <SearchBar />
      <Suspense key={query} fallback={<TableSkeleton />}>
        <Interviews query={query} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
