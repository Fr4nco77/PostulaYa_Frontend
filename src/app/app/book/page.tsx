import Pagination from "@/components/book/pagination";
import Searchbar from "@/components/book/searchbar";
import Table from "@/components/book/table";
import { Separator } from "@/components/ui/separator";
import { fetchApplicationsPages } from "@/lib/data";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { formatedQuery } from "@/lib/utils";

export default async function Book({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const token = cookies().get("authorization")?.value!;
  const query = formatedQuery(searchParams);
  const { totalPages } = await fetchApplicationsPages({ query, token });

  return (
    <div className="h-screen w-full flex-1">
      <main className="flex h-full w-full flex-col items-center justify-center p-10">
        <Searchbar token={token} className="h-10 w-full max-w-6xl" />
        <Separator className="my-3 w-full max-w-5xl bg-gray-800" />
        <Suspense key={query} fallback={<h1>loading</h1>}>
          <Table query={query} token={token} />
        </Suspense>
        <Pagination totalPages={totalPages} />
      </main>
    </div>
  );
}
