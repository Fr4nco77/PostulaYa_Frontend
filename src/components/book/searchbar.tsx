import { cn } from "@/lib/utils";
import React from "react";
import Search from "./input-search";
import Filter from "./select-filter";
import {
  modalitysNames,
  modalitysValues,
  typesNames,
  typesValues,
  orderNames,
  orderValues,
  limit,
  statusNames,
  statusValues,
} from "./data";
import CreateApplication from "./button-create";

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Searchbar({ className, token }: SearchProps) {
  return (
    <div className={cn(className)}>
      <div className="flex h-full w-full flex-col gap-5">
        <Search placeholder="¿Que estas buscando?" />
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
          <Filter
            placeholder="Cantidad"
            query="limit"
            names={limit}
            values={limit}
          />
          <CreateApplication token={token} />
        </div>
      </div>
    </div>
  );
}
