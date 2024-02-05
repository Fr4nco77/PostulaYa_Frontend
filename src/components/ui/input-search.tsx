"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./input";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SearchinputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export default function SearchInput({ className, ...props }: SearchinputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Input
      id="search"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
      className={cn(className)}
      {...props}
    />
  );
}
