import { fetchSkillsMetrics, fetchUserMetrics } from "@/lib/data/metrics";
import {
  Activity,
  AlarmClockCheck,
  BarChart2,
  Briefcase,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import Card from "./card";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import CardApplication from "./cardApplication";

interface UserMetricProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default async function User({
  className,
  token,
  ...props
}: UserMetricProps) {
  const { success, data } = await fetchUserMetrics({ token });
  const skills = await fetchSkillsMetrics({ token });
  const {
    totalApplications,
    totalInterviews,
    averageDayApplications,
    rateInterviews,
    averageResponseTime,
  } = data.response;

  const [userSkillsCount, missingSkillsCount] = skills.data.response.data;
  const skillsPorcent = !missingSkillsCount
    ? "100 %"
    : `${Math.round(
        (userSkillsCount * 100) / (userSkillsCount + missingSkillsCount),
      )} %`;

  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6",
        className,
      )}
      {...props}
    >
      <CardApplication data={totalApplications} token={token}/>
      <Card
        icon={<ClipboardCheck className="h-8 w-8 text-yellow-400" />}
        title="Entrevistas"
        data={totalInterviews}
        displayTooltip={false}
      />
      <Card
        icon={<TrendingUp className="h-8 w-8 text-yellow-400" />}
        title="Postulaciones Diarias"
        data={averageDayApplications}
        displayTooltip
        dataTooltip="Indica la cantidad de postulaciones que haces, en promedio, por día."
      />
      <Card
        icon={<Activity className="h-8 w-8 text-yellow-400" />}
        title="Frecuencia de Entrevistas"
        data={rateInterviews}
        displayTooltip
        dataTooltip="La frecuencia de entrevistas indica cada cuántas postulaciones realizadas puedes esperar obtener una entrevista. ¡Un valor más bajo es mejor, ya que significa más oportunidades de entrevistas por cada postulación realizada."
      />
      <Card
        icon={<AlarmClockCheck className="h-8 w-8 text-yellow-400" />}
        title="Tiempo de Respuesta"
        data={
          averageResponseTime === 1
            ? `${averageResponseTime} día`
            : `${averageResponseTime} días`
        }
        displayTooltip
        dataTooltip="Indica cuántos días, en promedio, transcurren desde que te postulas hasta que recibis una respuesta. Más bajo es mejor, ya que indica una respuesta más rápida por parte de los reclutadores."
      />
      <Card
        icon={<BarChart2 className="h-8 w-8 text-yellow-400" />}
        title="Habilidades Dominadas"
        data={skillsPorcent}
        displayTooltip
        dataTooltip="Refleja tu dominio en las habilidades necesarias para tus postulaciones, mostrando tu capacidad para cumplir con las expectativas laborales."
      />
    </section>
  );
}
