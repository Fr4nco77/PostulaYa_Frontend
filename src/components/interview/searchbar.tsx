import { cn } from "@/lib/utils";
import Search from "../ui/input-search";
import Filter from "../ui/select-filter";
import { HTMLAttributes } from "react";
import { limit } from "../book/data";

interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

export default function SearchBar({ className, ...props }: SearchProps) {
  return (
    <header className={cn("gap-5", className)} {...props}>
      <Search placeholder="Empresa" />
      <Filter
        placeholder="Cantidad"
        query="limit"
        names={limit}
        values={limit}
      />
    </header>
  );
}
