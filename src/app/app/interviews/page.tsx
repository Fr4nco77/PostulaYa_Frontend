import Pagination from "@/components/ui/pagination";
import Interviews from "@/components/interview/interviews";
import SearchBar from "@/components/interview/searchbar";
import { fetchAllInterviews, fetchInterviewsPages } from "@/lib/data/interview";
import { formatedQuery } from "@/lib/utils";
import Filter from "@/components/ui/select-filter";
import { limit } from "@/lib/dataComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrevistas",
  description:
    "Descubre una amplia variedad de entrevistas realizadas por profesionales en nuestra sección de Entrevistas. Obtén insights valiosos, consejos y prepárate para tus futuras entrevistas laborales. Explora experiencias reales y empodérate para destacar en tus propias entrevistas. ¡Prepárate para el éxito profesional con nuestra colección de entrevistas inspiradoras!",
};

export default async function InterviewsPage({
  searchParams,
}: {
  searchParams: { query?: string; limit?: string };
}) {
  const query = formatedQuery(searchParams);
  const { successPages, dataPages } = await fetchInterviewsPages({ query });
  const { successInterviews, dataInterviews } = await fetchAllInterviews({
    query,
  });

  return (
    <div className="flex h-full w-full max-w-[850px] flex-col gap-5 xl:max-w-7xl">
      <SearchBar />
      {!successInterviews ? (
        <div className="flex h-96 w-full flex-col items-center justify-center rounded-lg bg-slate-50 px-5 py-3 shadow-md lg:grow">
          <h1 className="text-4xl font-black">{dataInterviews.name}</h1>
          <span className="p-3 text-lg font-medium text-gray-500">
            {dataInterviews.message}
          </span>
        </div>
      ) : (
        <Interviews data={dataInterviews} />
      )}

      <section className="flex w-full flex-col-reverse items-center justify-center gap-4 sm:justify-end md:flex-row md:gap-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Entrevistas por pagina</span>
          <Filter
            placeholder="6"
            query="limit"
            names={limit}
            values={limit}
            className="max-w-min"
          />
        </div>
        <Pagination
          totalPages={successPages ? dataPages.response.totalPages : 0}
        />
      </section>
    </div>
  );
}
