import Searchbar from "@/components/book/searchbar";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Book() {
  return (
    <div className="h-screen w-full flex-1">
      <main className="flex h-full w-full flex-col items-center justify-center p-10">
        <Searchbar className="h-10 w-full max-w-5xl"/>
        <Separator className="w-full max-w-5xl my-3 bg-gray-800"/> 
      </main>
    </div>
  );
}
