import React from "react";
import Search from "../ui/input-search";
import Filter from "../ui/select-filter";
import {
  modalitysNames,
  modalitysValues,
  workdaysNames,
  workdaysValues,
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
      <div className="flex gap-2 max-lg:flex-wrap">
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
          placeholder="Jornada"
          query="workday"
          names={workdaysNames}
          values={workdaysValues}
        />
        <Filter
          placeholder="Orden"
          query="order"
          names={orderNames}
          values={orderValues}
        />
        <CreateApplication token={token} basicStyle={false}/>
      </div>
    </div>
  );
}
