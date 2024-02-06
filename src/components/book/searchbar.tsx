import React from "react";
import Search from "../ui/input-search";
import Filter from "../ui/select-filter";
import {
  modalitysNames,
  modalitysValues,
  typesNames,
  typesValues,
  orderNames,
  orderValues,
  statusNames,
  statusValues,
} from "@/lib/dataComponents";
import CreateApplication from "./button-create";

export default function Searchbar({ token }: { token: string }) {
  return (
    <div className="flex h-auto w-full flex-col items-center justify-between gap-2 lg:flex-row">
      <Search
        placeholder="¿Posición, empresa, ubicación o reclutador?"
        className="max-w-[472.55px] lg:max-xl:max-w-xs xl:max-w-md"
      />
      <div className="flex flex-wrap gap-2">
        <Filter
          placeholder="Estado"
          query="status"
          names={statusNames}
          values={statusValues}
        />
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
        <CreateApplication token={token} />
      </div>
    </div>
  );
}
