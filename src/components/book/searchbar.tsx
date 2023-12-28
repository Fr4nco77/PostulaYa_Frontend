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
} from "./data";
import CreateApplication from "./button-create";

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Searchbar({ className, token }: SearchProps) {
  return (
    <div className={cn(className)}>
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex w-full items-center gap-7">
          <div className="w-full max-w-lg">
            <Search placeholder="Search" />
          </div>
          <div className="flex items-center gap-2">
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
        <CreateApplication token={token} />
      </div>
    </div>
  );
}
