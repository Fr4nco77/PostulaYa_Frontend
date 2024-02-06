import Searchbar from "@/components/applications/searchBar";
import ApplicationTable from "@/components/applications/table";
import TableSkeleton from "@/components/ui/table-skeleton";
import Pagination from "@/components/ui/pagination";
import Filter from "@/components/ui/select-filter";
import { fetchAllPagesApplications } from "@/lib/data/application";
import { limit } from "@/lib/dataComponents";
import { formatedQuery } from "@/lib/utils";
import { Suspense } from "react";

export default async function Applications({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = formatedQuery(searchParams);
  const { data } = await fetchAllPagesApplications({ query });

  return (
    <div className="flex h-full w-full max-w-[850px] flex-col gap-3 xl:max-w-7xl">
      <Searchbar />
      <Suspense
        key={query}
        fallback={
          <TableSkeleton
            rowCount={Number(searchParams.limit) || 6}
            cellCount={8}
            displayHeader={false}
          />
        }
      >
        <ApplicationTable query={query} />
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
        <Pagination totalPages={data.response.totalPages} />
      </div>
    </div>
  );
}
