import { Badge } from "@/components/ui/badge";
import { fetchUser } from "@/lib/data/user";
import { Skill, Skills } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import EditSkills from "./button-editSkills";
import { Separator } from "@/components/ui/separator";

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

  const userSkills = data.response.skills;
  const userSkillNames = userSkills.map((skill: Skill) => skill.name);
  const requiredSkills = skills?.map((skill: Skill) => skill.name);
  const userSkillsCount = userSkillNames.filter((skill: string) =>
    requiredSkills.includes(skill),
  ).length;

  return (
    <section className={cn("flex flex-col gap-2 p-3", className)} {...props}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">
          Habilidades Requeridas
        </h2>
        <EditSkills
          token={token}
          applicationID={applicationID}
          skills={skills}
        />
      </div>
      <Separator className="bg-slate-300" />
      <div className="flex w-full flex-col gap-3">
        {userSkillsCount > 0 ? (
          userSkillsCount === requiredSkills.length ? (
            <span className="font-bold text-green-600">
              ¡Tienes todas las habilidades requeridas para este puesto! 🚀
            </span>
          ) : (
            <span>
              Tienes{" "}
              <span className="font-bold text-green-600">
                {userSkillsCount} habilidad{userSkillsCount !== 1 && "es"}
              </span>{" "}
              de las requeridas para este puesto.
            </span>
          )
        ) : (
          <span className="font-bold text-red-600">
            De momento no tienes ninguna habilidad de las requeridas para este
            puesto.
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          {skills?.map(({ _id, name }: { _id: string; name: string }) => (
            <Badge
              key={_id}
              className={cn(
                "cursor-default transition duration-300",
                userSkillNames.includes(name)
                  ? "bg-green-200 text-green-600 hover:bg-green-200"
                  : "bg-red-200 text-red-600 hover:bg-red-200",
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
