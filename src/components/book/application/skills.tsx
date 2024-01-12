import { Badge } from "@/components/ui/badge";
import { fetchUser } from "@/lib/data";
import { Skill, Skills } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import EditSkills from "./button-editSkills";

interface SkillsProps extends HTMLAttributes<HTMLDivElement> {
  skills: Skills;
  token: string;
  applicationID: string;
}
export default async function Skills({
  className,
  skills,
  token,
  applicationID,
  ...props
}: SkillsProps) {
  const { success, data } = await fetchUser({ token });

  if (!success) {
    return (
      <div>
        <h1>{data.name}</h1>
        <span>{data.message}</span>
      </div>
    );
  }

  const userSkills = data.response.skills;
  const userSkillNames = userSkills.map((skill: Skill) => skill.name);
  const requiredSkills = skills?.map((skill: Skill) => skill.name);
  const userSkillsCount = userSkillNames.filter((skill: string) =>
    requiredSkills.includes(skill),
  ).length;

  return (
    <section
      className={cn("flex flex-col gap-2 p-3", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg">Habilidades Requeridas</h3>
        <EditSkills
          token={token}
          applicationID={applicationID}
          skills={skills}
        />
      </div>
      <div className="flex w-full flex-col gap-3">
        {userSkillsCount > 0 ? (
          <span>
            Tienes {userSkillsCount}{" "}
            {userSkillsCount > 1 ? "habilidades" : "habilidad"} de las
            requeridas para este puesto.
          </span>
        ) : (
          <span>
            De momento no tienes ninguna habilidad de las requeridas para este
            puesto, pero ya sabes cuales pueden ser tus nuevas habilidades
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          {skills?.map(({ _id, name }: { _id: string; name: string }) => (
            <Badge
              key={_id}
              className={cn(
                "font-bold text-slate-900",
                userSkillNames.includes(name)
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-red-600 hover:bg-red-500",
              )}
            >
              {name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
