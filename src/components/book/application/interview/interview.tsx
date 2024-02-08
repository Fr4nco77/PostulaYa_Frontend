import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import CreateInterview from "./button-create";
import { fetchUserInterviews } from "@/lib/data/interview";
import { ViewInterview } from "./button-view";
import { DeleteInterview } from "./button-delete";
import { Separator } from "@/components/ui/separator";

interface InterviewsProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
  application: string;
  position: string;
  company: string;
}

export default async function Interviews({
  className,
  token,
  application,
  position,
  company,
  ...props
}: InterviewsProps) {
  const { success, data } = await fetchUserInterviews({ token, application });

  if (!success) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="text-2xl font-bold">{data.name}</h3>
        <span>{data.message}</span>
      </div>
    );
  }

  return (
    <section
      className={cn("gap-3 rounded-lg bg-slate-100 p-3 shadow-xl", className)}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <h2 className="text-slate text-2xl font-black">Entrevistas</h2>
        <CreateInterview
          token={token}
          application={application}
          position={position}
          company={company}
        />
      </div>
      {!data.response.interviews.length ? (
        <div className="flex h-full w-full items-center justify-center">
          <span>No hay entrevistas registradas</span>
        </div>
      ) : (
        data.response.interviews.map((interview: any) => {
          return (
            <>
              <Separator className="bg-slate-300" />
              <div
                key={interview._id}
                className="flex w-full items-center justify-between"
              >
                <span className="font-medium">{interview.created_at.split("T")[0]}</span>
                <div className="flex items-center gap-2">
                  <ViewInterview interview={interview} />
                  <DeleteInterview
                    token={token}
                    interview={interview._id}
                    application={interview.application}
                  />
                </div>
              </div>
            </>
          );
        })
      )}
    </section>
  );
}
