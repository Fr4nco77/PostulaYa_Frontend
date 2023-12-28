"use client";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function ClearFilters() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const clearFilters = () => {
    replace(pathname);
  };
  return (
    <Button onClick={clearFilters} variant="outline">
      Clear
    </Button>
  );
}
