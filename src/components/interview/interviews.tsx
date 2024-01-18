import { fetchAllInterviews } from "@/lib/data/interview";
import Interview from "./interview";

export default async function Interviews({ query }: { query: string }) {
  const { success, data } = await fetchAllInterviews({ query });

  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>{data.name}</h1>
        <p>{data.message}</p>
      </div>
    );
  }

  const { interviews } = data.response;

  return (
    <main className="flex w-full flex-col items-center gap-4">
      {interviews.length > 0 ? (
        interviews.map((interview: any) => {
          return <Interview key={interview._id} interview={interview} />;
        })
      ) : (
        <span>No se encontraron Entrevistas</span>
      )}
    </main>
  );
}
