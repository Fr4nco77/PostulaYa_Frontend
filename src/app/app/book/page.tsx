import Pagination from "@/components/ui/pagination";
import Searchbar from "@/components/book/searchbar";
import Table from "@/components/book/table";
import { fetchApplicationsPages } from "@/lib/data/application";
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
      <Searchbar token={token} />
      <Suspense key={query} fallback={<TableSkeleton />}>
        <Table query={query} token={token} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
