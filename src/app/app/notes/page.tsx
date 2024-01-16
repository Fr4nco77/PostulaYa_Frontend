import ButtonCreate from "@/components/note/button-create";
import Notes from "@/components/note/notes";
import { cookies } from "next/headers";

export default function NotesPage() {
  const token = cookies().get("authorization")?.value!;

  return (
    <div className="flex w-full flex-col items-center gap-5 py-5 lg:h-full lg:w-auto lg:max-w-5xl">
      <header className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Notas</h1>
        <ButtonCreate token={token} />
      </header>
      <Notes
        token={token}
        className="flex w-full flex-wrap items-center justify-center"
      />
    </div>
  );
}
