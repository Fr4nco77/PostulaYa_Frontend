import Search from "../ui/input-search";
import Filter from "../ui/select-filter";
import { limit } from "../book/data";

export default function SearchBar() {
  return (
    <header className="flex w-full max-w-2xl gap-5 rounded-2xl bg-slate-100 p-3 shadow-xl">
      <Search placeholder="Dime cual empresa o puesto esta buscando" />
      <Filter
        placeholder="Cantidad"
        query="limit"
        names={limit}
        values={limit}
      />
    </header>
  );
}
