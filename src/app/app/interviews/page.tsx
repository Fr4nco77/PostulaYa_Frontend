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
  const { totalPages } = await fetchInterviewsPages({ query });
  const { success, data } = await fetchAllInterviews({ query });

  return (
    <div className="flex h-full w-full max-w-[850px] flex-col gap-5 xl:max-w-7xl">
      <SearchBar />
      <Interviews data={data} />
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
        <Pagination totalPages={totalPages} />
      </section>
    </div>
  );
}
