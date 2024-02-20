import Search from "@/components/ui/input-search";
import Filter from "@/components/ui/select-filter";
import {
  categoryNames,
  categoryValues,
  modalitysNames,
  modalitysValues,
  workdaysNames,
  workdaysValues,
} from "@/lib/dataComponents";

export default function Searchbar() {
  return (
    <header className="flex h-auto w-full flex-col items-center justify-between gap-2 md:flex-row">
      <Search
        placeholder="¿Posición, empresa o ubicación?"
        className="max-w-xs lg:max-w-md"
      />
      <div className="flex flex-wrap gap-2">
        <Filter
          placeholder="Categoria"
          query="category"
          names={categoryNames}
          values={categoryValues}
        />
        <Filter
          placeholder="Modalidad"
          query="modality"
          names={modalitysNames}
          values={modalitysValues}
        />
        <Filter
          placeholder="Jornada"
          query="workday"
          names={workdaysNames}
          values={workdaysValues}
        />
      </div>
    </header>
  );
}
