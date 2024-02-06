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
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">{data.name}</h2>
        <span>{data.message}</span>
      </div>
    );
  }

  return (
    <main
      className={cn(
        "gap-5 overflow-y-auto rounded-lg border bg-slate-50 p-3 lg:gap-8",
        className,
      )}
      {...props}
    >
      {data.response.length ? (
        data.response?.map(({ _id, title, body, favorite }: Note) => {
          return (
            <div
              key={_id}
              className="w-full max-w-xs rounded-xl bg-yellow-400 p-3 shadow-md"
            >
              <div className="flex items-center justify-between">
                <h4 className="truncate font-medium">{title}</h4>
                <div className="flex items-center gap-2">
                  <AddFavorite _id={_id} token={token} favorite={favorite!} />
                  <EditNote
                    _id={_id}
                    token={token}
                    title={title}
                    body={body}
                    favorite={favorite}
                  />
                  <DeleteNote _id={_id} token={token} className="h-7 w-7 p-1" />
                </div>
              </div>
              <Textarea
                defaultValue={body}
                disabled
                className="resize-none disabled:cursor-text"
              />
            </div>
          );
        })
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-xl font-medium">No hay notas agregadas</span>
        </div>
      )}
    </main>
  );
}
