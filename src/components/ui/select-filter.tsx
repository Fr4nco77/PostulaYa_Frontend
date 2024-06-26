"use client";

import { HTMLAttributes, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { FilterProps } from "@/lib/definitions";

interface SelectFilterProps
  extends HTMLAttributes<HTMLDivElement>,
    FilterProps {}

export default function Filter({
  className,
  placeholder,
  names,
  values,
  query,
  ...props
}: SelectFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (term && term !== "null") {
        params.set(query, term);
      } else {
        params.delete(query);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, query, replace],
  );

  return (
    <div className={cn("flex max-lg:flex-1", className)} {...props}>
      <Select
        defaultValue={searchParams.get(query)?.toString()}
        onValueChange={handleFilter}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values?.map((value: string, index: number) => (
            <SelectItem
              key={value}
              value={value}
              className="transition duration-300 focus:bg-[rgb(8,11,28)] focus:text-yellow-400"
            >
              {names[index]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
