import Search from "../ui/input-search";
import Filter from "../ui/select-filter";
import { categoryNames, categoryValues } from "@/lib/dataComponents";

export default function SearchBar() {
  return (
    <header className="flex h-auto w-full items-center gap-2 md:gap-6">
      <Search
        placeholder="¿Cuál empresa o puesto estas buscando?"
        className="max-w-md"
      />
      <div className="flex flex-wrap gap-2">
        <Filter
          placeholder="Categoria"
          query="category"
          names={categoryNames}
          values={categoryValues}
        />
      </div>
    </header>
  );
}
