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
import ApplicationsByTime from "@/components/metrics/applicationsByTime";
import Status from "@/components/metrics/status";
import Modality from "@/components/metrics/modality";
import Workdays from "@/components/metrics/workdays";

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
  const { success, data } = await fetchApplicationsPages({ query, token });

  return (
    <main className="flex h-full w-full max-w-[850px] flex-col gap-3 xl:max-w-7xl">
      <section className="hidden h-32 w-full items-center justify-between lg:flex">
        <ApplicationsByTime token={token} className="h-full w-96" />
        <Status token={token} className="h-full w-72" />
        <Modality token={token} className="hidden h-full w-60 xl:block" />
        <Workdays token={token} className="hidden h-full w-60 xl:block" />
      </section>
      <Separator className="hidden lg:block bg-slate-300" />
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
      <section className="flex w-full flex-col-reverse items-center justify-center gap-4 sm:justify-end md:flex-row md:gap-8">
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
        <Pagination totalPages={success ? data.response.totalPages : 0 } />
      </section>
    </main>
  );
}
