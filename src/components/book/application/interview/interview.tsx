import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import CreateInterview from "./button-create";
import { fetchUserInterviews } from "@/lib/data/interview";
import { ViewInterview } from "./button-view";
import { DeleteInterview } from "./button-delete";

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
      <div className="flex flex-col items-center justify-center">
        <h1>{data.name}</h1>
        <p>{data.message}</p>
      </div>
    );
  }
  
  return (
    <section
      className={cn("gap-3 rounded-lg bg-slate-100 p-3 shadow-xl", className)}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <h3>Entrevistas</h3>
        <CreateInterview
          token={token}
          application={application}
          position={position}
          company={company}
        />
      </div>
      {data.response.interviews.map((interview: any) => {
        return (
          <div
            key={interview._id}
            className="flex w-full items-center justify-between"
          >
            <span>{interview.created_at.split("T")[0]}</span>
            <div className="flex items-center gap-2">
              <ViewInterview
                interviewer={interview.interviewer}
                duration={interview.duration}
                preparation={interview.preparation}
                feeling={interview.feeling}
                questions={interview.questions}
                answers={interview.answers}
                feedback={interview.feedback}
                observation={interview.observation}
                likes={interview.likes}
                created_at={interview.created_at}
              />
              <DeleteInterview
                token={token}
                interview={interview._id}
                application={interview.application}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
