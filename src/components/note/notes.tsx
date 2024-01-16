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
      <>
        <h1>{data.name}</h1>
        <span>{data.message}</span>
      </>
    );
  }

  return (
    <main
      className={cn("gap-5 overflow-y-auto border p-3 lg:max-h-fit lg:gap-8", className)}
      {...props}
    >
      {data.response.length ? (
        data.response?.map(({ _id, title, body, favorite }: Note) => {
          return (
            <div key={_id} className="w-full rounded-xl p-3 shadow-md md:max-w-xs lg:max-w-sm">
              <div className="flex items-center justify-between">
                <h1>{title}</h1>
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
              <Textarea defaultValue={body} className="resize-none" disabled />
            </div>
          );
        })
      ) : (
        <span>No hay notas agregadas</span>
      )}
    </main>
  );
}
