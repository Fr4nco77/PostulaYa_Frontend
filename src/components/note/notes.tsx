import { Textarea } from "@/components/ui/textarea";
import { fetchNotes } from "@/lib/data/note";
import DeleteNote from "./button-deleteNote";
import { EditNote } from "./button-editNote";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Note } from "@/lib/definitions";
import AddFavorite from "./button-favorite";

interface NotesProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default async function Notes({
  className,
  token,
  ...props
}: NotesProps) {
  const { success, data } = await fetchNotes({ token });
  if (!success) {
    return (
      <main className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">{data.name}</h2>
        <span>{data.message}</span>
      </main>
    );
  }

  return (
    <main
      className={cn(
        "gap-5 overflow-y-auto rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 p-3 lg:gap-8",
        className,
      )}
      {...props}
    >
      {data.response.length ? (
        data.response?.map(({ _id, title, body, favorite }: Note) => {
          return (
            <div
              key={_id}
              className="w-full max-w-xs rounded-lg bg-yellow-400 p-3 shadow-md max-[375px]:max-w-[250px]"
            >
              <div className="flex items-center justify-between">
                <h4 className="truncate font-semibold">{title}</h4>
                <div className="flex items-center gap-2">
                  <AddFavorite _id={_id} token={token} favorite={favorite!} />
                  <EditNote
                    _id={_id}
                    token={token}
                    title={title}
                    body={body}
                    favorite={favorite}
                  />
                  <DeleteNote _id={_id} token={token} />
                </div>
              </div>
              <Textarea
                defaultValue={body}
                disabled
                className="resize-none disabled:cursor-text disabled:border-yellow-400  disabled:text-black"
              />
            </div>
          );
        })
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="my-48 text-center text-2xl font-bold">
            No hay notas agregadas
          </span>
        </div>
      )}
    </main>
  );
}
