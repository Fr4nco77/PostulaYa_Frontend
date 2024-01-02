import { Textarea } from "@/components/ui/textarea";
import { fetchNotes } from "@/lib/data";
import DeleteNote from "./button-deleteNote";
import { EditNote } from "./button-editNote";

export default async function Notes({
  applicationID,
}: {
  applicationID: string;
}) {
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
    <div className="flex h-2/3 w-full flex-col items-start justify-start overflow-y-scroll">
      {data.response.length ? (
        data.response?.map(
          ({
            _id,
            title,
            body,
          }: {
            _id: string;
            title: string;
            body: string;
          }) => {
            return (
              <div key={_id} className="w-full">
                <div className="w-full rounded-xl p-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <h1>{title}</h1>
                    <div className="flex gap-4">
                      <EditNote _id={_id} title={title} body={body} />
                      <DeleteNote _id={_id} />
                    </div>
                  </div>
                  <Textarea defaultValue={body} disabled />
                </div>
                {/* <Separator className="my-2" /> */}
              </div>
            );
          },
        )
      ) : (
        <span>No hay notas agregadas</span>
      )}
    </div>
  );
}
