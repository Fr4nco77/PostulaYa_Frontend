import { Textarea } from "@/components/ui/textarea";
import { fetchNotes } from "@/lib/data/application";
import DeleteNote from "./button-deleteNote";
import { EditNote } from "./button-editNote";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Note } from "@/lib/definitions";

interface NotesProps extends HTMLAttributes<HTMLDivElement> {
  applicationID: string;
}

export default async function Notes({
  className,
  applicationID,
  ...props
}: NotesProps) {
  const { success, data } = await fetchNotes({ applicationID });
  if (!success) {
    return (
      <>
        <h1>{data.name}</h1>
        <span>{data.message}</span>
      </>
    );
  }

  return (
    <div
      className={cn("flex flex-col overflow-y-scroll p-3", className)}
      {...props}
    >
      {data.response.length ? (
        data.response?.map(({ _id, title, body }: Note) => {
          return (
            <div key={_id} className="w-full">
              <div className="w-full rounded-xl p-3 shadow-md">
                <div className="flex items-center justify-between">
                  <h1>{title}</h1>
                  <div className="flex items-center gap-2">
                    <EditNote _id={_id} title={title} body={body} />
                    <DeleteNote _id={_id} className="h-7 w-7 p-1" />
                  </div>
                </div>
                <Textarea defaultValue={body} disabled />
              </div>
            </div>
          );
        })
      ) : (
        <span>No hay notas agregadas</span>
      )}
    </div>
  );
}
