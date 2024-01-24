import Search from "@/components/ui/input-search";
import Filter from "@/components/ui/select-filter";
import {
  modalitysNames,
  modalitysValues,
  typesNames,
  typesValues,
  orderNames,
  orderValues,
  limit,
} from "@/components/book/data";

export default function Searchbar() {
  return (
    <header className="h-auto w-full max-w-2xl rounded-2xl bg-slate-100 p-3 shadow-xl">
      <div className="flex h-full w-full flex-col gap-5">
        <Search placeholder="¿Algun puesto en particular?" />
        <div className="flex flex-wrap gap-2">
          <Filter
            placeholder="Modalidad"
            query="modality"
            names={modalitysNames}
            values={modalitysValues}
          />
          <Filter
            placeholder="Tipo"
            query="type"
            names={typesNames}
            values={typesValues}
          />
          <Filter
            placeholder="Orden"
            query="order"
            names={orderNames}
            values={orderValues}
          />
          <Filter
            placeholder="Cantidad"
            query="limit"
            names={limit}
            values={limit}
          />
        </div>
      </div>
    </header>
  );
}
