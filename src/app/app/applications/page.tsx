import Searchbar from "@/components/applications/searchBar";
import ApplicationTable from "@/components/applications/table";
import TableSkeleton from "@/components/applications/table-skeleton";
import Pagination from "@/components/ui/pagination";
import { fetchAllPagesApplications } from "@/lib/data/application";
import { formatedQuery } from "@/lib/utils";
import React, { Suspense } from "react";

export default async function Applications({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = formatedQuery(searchParams);
  const { data } = await fetchAllPagesApplications({ query });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <Searchbar />
      <Suspense key={query} fallback={<TableSkeleton />}>
        <ApplicationTable query={query} />
      </Suspense>
      <Pagination totalPages={data.response.totalPages} />
    </div>
  );
}
