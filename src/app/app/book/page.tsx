import Pagination from "@/components/ui/pagination";
import Searchbar from "@/components/book/searchbar";
import Table from "@/components/book/table";
import { fetchApplicationsPages } from "@/lib/data/application";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { formatedQuery } from "@/lib/utils";
import TableSkeleton from "@/components/ui/table-skeleton";
import { Metadata } from "next";
import Filter from "@/components/ui/select-filter";
import { limit } from "@/lib/dataComponents";
import { Separator } from "@/components/ui/separator";
import Status from "@/components/book/charts/status";
import ApplicationsByTime from "@/components/book/charts/applications";
import Modalitys from "@/components/book/charts/modalitys";
import Types from "@/components/book/charts/types";

export const metadata: Metadata = {
  title: "Bitácora",
};

export default async function Book({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const token = cookies().get("authorization")?.value!;
  const query = formatedQuery(searchParams);
  const { totalPages } = await fetchApplicationsPages({ query, token });

  return (
    <main className="flex h-full w-full max-w-[850px] flex-col gap-3 xl:max-w-7xl">
      <div className="hidden h-28 w-full items-center justify-between lg:flex">
        <ApplicationsByTime token={token} className="h-full w-96" />
        <Status token={token} className="h-full w-72 " />
        <Modalitys token={token} className="hidden h-full w-60 xl:block" />
        <Types token={token} className="hidden h-full w-60 xl:block" />
      </div>
      <Separator className="hidden lg:block" />
      <Searchbar token={token} />
      <Suspense
        key={query}
        fallback={
          <TableSkeleton
            rowCount={Number(searchParams.limit) || 6}
            cellCount={8}
            displayHeader
          />
        }
      >
        <Table query={query} token={token} />
      </Suspense>
      <div className="flex w-full flex-col-reverse items-center justify-center gap-4 sm:justify-end md:flex-row md:gap-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Postulaciones por pagina</span>
          <Filter
            placeholder="6"
            query="limit"
            names={limit}
            values={limit}
            className="max-w-min"
          />
        </div>
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
