import { fetchTopSkills } from "@/lib/data/metrics";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Skeleton } from "../ui/skeleton";

interface TopSkillsProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default async function TopSkills({
  className,
  token,
  ...props
}: TopSkillsProps) {
  const { success, data } = await fetchTopSkills({ token });

  if (!success) {
    return (
      <div className={cn(className)} {...props}>
        <Skeleton className="h-full w-full" />
      </div>
    );
  }
  const { topRequiredSkills, topMissingSkills } = data.response;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between rounded-xl bg-slate-100 p-3 shadow-lg",
        className,
      )}
      {...props}
    >
      <div className="flex w-1/2 items-center justify-center flex-col ">
        <h3 className="text-xl font-bold">Top Habilidades Requeridas</h3>
        <ul>
          {topRequiredSkills.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="flex w-1/2 items-center justify-center flex-col ">
        <h3 className="text-xl font-bold">
          Habilidades Pendientes
        </h3>
        <ul>
          {topMissingSkills.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
