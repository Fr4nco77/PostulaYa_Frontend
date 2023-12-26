import { cn } from "@/lib/utils";
import React from "react";
import Search from "./input-search";
import Filter from "./select-filter";
import { modalitys, types } from "./data";
import Button from "./button-create";
interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Searchbar({ className, ...props }: SearchProps) {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex items-center w-full gap-7">
            <div className="w-full max-w-lg">
              <Search placeholder="Search" />
            </div>
          <div className="flex items-center gap-2">
            <Filter
              placeholder="Modalidad"
              query="modality"
              values={modalitys}
            />
            <Filter placeholder="Tipo" query="type" values={types} />
          </div>
        </div>
        <Button />
      </div>
    </div>
  );
}
