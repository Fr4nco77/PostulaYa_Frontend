"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter({
  placeholder,
  values,
  query,
}: {
  placeholder: string;
  values: string[];
  query: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (term: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term && term !== values[0]) {
      params.set(query, term);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-1 flex-shrink-0">
      <Select
        defaultValue={searchParams.get(query)?.toString()}
        onValueChange={(e) => handleFilter(e)}
      >
        <SelectTrigger >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values?.map((value: string, index: number) => (
            <SelectItem key={index} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
