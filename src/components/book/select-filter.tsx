"use client";

import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterProps } from "@/lib/definitions";

export default function Filter({
  placeholder,
  names,
  values,
  query,
}: FilterProps) {
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
    [searchParams, pathname, replace],
  );

  return (
    <div className="flex flex-1 flex-shrink-0">
      <Select
        defaultValue={searchParams.get(query)?.toString()}
        onValueChange={handleFilter}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values?.map((value: string, index: number) => (
            <SelectItem key={value} value={value}>
              {names[index]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
