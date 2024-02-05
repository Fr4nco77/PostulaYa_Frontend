"use client";
import { useState, useEffect, HTMLAttributes } from "react";
import { fetchTypesMetrics } from "@/lib/data/metrics";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TypesProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Types({ className, token, ...props }: TypesProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchTypesMetrics({ token }).then(({ success, data }) => {
      if (success) {
        const values = {
          labels: data.response.labels,
          datasets: [
            {
              label: "Postulaciones",
              data: data.response.data,
              backgroundColor: [
                "rgb(191 219 254)",
                "rgb(229 231 235)",
              ],
              borderColor: [
                "rgb(37 99 235)",
                "rgb(75 85 99)",
              ],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        };
        setChartData(values);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div className={cn("rounded-lg bg-[rgb(8,11,28)]", className)} {...props}>
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <Doughnut
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "left",
                maxWidth: 150,
                labels: {
                  color: "rgb(250 204 21)",
                  boxWidth: 12,
                },
                title: {
                  text: "Jornada",
                  color: "rgb(250 204 21)",
                  font: { size: 16, weight: "bolder" },
                  display: true,
                },
              },
            },
            animation: {
              animateRotate: true,
              animateScale: true,
            },
            layout: {
              padding: {
                top: 5,
                bottom: 5,
                left: 10,
              },
            },
          }}
        />
      )}
    </div>
  );
}
