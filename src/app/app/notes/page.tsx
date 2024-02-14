import ButtonCreate from "@/components/note/button-create";
import Notes from "@/components/note/notes";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Notas",
};

export default function NotesPage() {
  const token = cookies().get("authorization")?.value!;

  return (
    <div className="flex h-full max-w-3xl flex-grow flex-col items-center gap-5 rounded-lg bg-slate-50 p-3 shadow-md lg:p-6 xl:max-w-6xl">
      <header className="flex w-full items-center justify-between md:px-3">
        <h1 className="text-4xl font-black">Notas</h1>
        <ButtonCreate token={token} />
      </header>
      <Notes
        token={token}
        className="flex h-full w-full flex-wrap items-start justify-evenly"
      />
    </div>
  );
}
