import ButtonCreate from "@/components/note/button-create";
import Notes from "@/components/note/notes";
import { cookies } from "next/headers";

export default function NotesPage() {
  const token = cookies().get("authorization")?.value!;

  return (
    <div className="flex h-full max-w-6xl flex-grow flex-col items-center gap-5 rounded-lg bg-slate-100 px-3 py-5 shadow-xl ">
      <header className="flex w-full items-center justify-between px-5">
        <h1 className="text-2xl font-bold">Notas</h1>
        <ButtonCreate token={token} />
      </header>
      <Notes
        token={token}
        className="flex h-full w-full flex-wrap items-start justify-evenly"
      />
    </div>
  );
}
