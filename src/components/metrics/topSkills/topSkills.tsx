import { fetchTopSkills } from "@/lib/data/metrics";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Skeleton } from "../../ui/skeleton";
import { BookCheck, Wrench } from "lucide-react";
import Card from "./card";

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
    <section
      className={cn(
        "grid grid-cols-1 gap-5 md:max-lg:grid-cols-2 xl:grid-cols-2",
        className,
      )}
      {...props}
    >
      <Card
        icon={<BookCheck className="h-8 w-8" />}
        title="Habilidades Top"
        data={topRequiredSkills}
        color="bg-blue-200 text-blue-600"
        displayTooltip
        dataTooltip="Lista de las habilidades más demandadas de acuerdo a tus postulaciones."
      />
      <Card
        icon={<Wrench className="h-8 w-8" />}
        title="Habilidades Recomendadas"
        data={topMissingSkills}
        color="bg-green-200 text-green-600"
        displayTooltip
        dataTooltip="Lista de las habilidades más demandadas que no posees de acuerdo a tus postulaciones y las habilidades que tienes registradas."
      />
    </section>
  );
}
