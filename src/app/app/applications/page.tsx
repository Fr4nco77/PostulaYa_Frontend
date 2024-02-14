import Searchbar from "@/components/applications/searchBar";
import ApplicationTable from "@/components/applications/table";
import TableSkeleton from "@/components/ui/table-skeleton";
import Pagination from "@/components/ui/pagination";
import Filter from "@/components/ui/select-filter";
import { fetchAllPagesApplications } from "@/lib/data/application";
import { limit } from "@/lib/dataComponents";
import { formatedQuery } from "@/lib/utils";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacantes",
  description:
    "Explora las últimas vacantes disponibles con detalles sobre puestos, empresas, ubicaciones y habilidades requeridas. Encuentra la oportunidad laboral perfecta para ti en PostulaYa.",
};

export default async function Applications({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = formatedQuery({
    limit: searchParams.limit || "10",
    ...searchParams,
  });
  const { success, data } = await fetchAllPagesApplications({ query });

  return (
    <main className="flex h-full w-full max-w-[850px] flex-col gap-3 xl:max-w-7xl">
      <Searchbar />
      <Suspense
        key={query}
        fallback={
          <TableSkeleton
            rowCount={Number(searchParams.limit) || 10}
            cellCount={8}
            displayHeader
          />
        }
      >
        <ApplicationTable query={query} />
      </Suspense>
      <section className="flex w-full flex-col-reverse items-center justify-center gap-4 sm:justify-end md:flex-row md:gap-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Postulaciones por pagina</span>
          <Filter
            placeholder="10"
            query="limit"
            names={limit}
            values={limit}
            className="max-w-min"
          />
        </div>
        <Pagination totalPages={success ? data.response.totalPages : 0} />
      </section>
    </main>
  );
}
