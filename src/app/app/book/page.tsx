import Pagination from "@/components/book/pagination";
import Searchbar from "@/components/book/searchbar";
import Table from "@/components/book/table";
import { fetchApplicationsPages } from "@/lib/data";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { formatedQuery } from "@/lib/utils";
import TableSkeleton from "@/components/book/table-skeleton";

export default async function Book({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const token = cookies().get("authorization")?.value!;
  const query = formatedQuery(searchParams);
  const { totalPages } = await fetchApplicationsPages({ query, token });

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-5">
      <Searchbar
        token={token}
        className="h-auto w-full max-w-2xl rounded-2xl bg-slate-100 p-3 shadow-xl"
      />
      <Suspense key={query} fallback={<TableSkeleton />}>
        <Table query={query} token={token} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
