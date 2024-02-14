"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function Back() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-lg transition duration-300 hover:bg-slate-200"
      onClick={router.back}
    >
      <ChevronLeft className="mr-2 h-4 w-4" /> Volver
    </Button>
  );
}
