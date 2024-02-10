"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchStatusMetrics } from "@/lib/data/metrics";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Status({ className, token, ...props }: StatusProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchStatusMetrics({ token }).then(({ success, data }) => {
      if (success) {
        const values = {
          labels: data.response.labels,
          datasets: [
            {
              label: "Postulaciones",
              data: data.response.data,
              backgroundColor: [
                "rgb(253 224 71)",
                "rgb(187 247 208)",
                "rgb(254 202 202)",
              ],
              borderColor: [
                "rgb(250 204 21)",
                "rgb(22 163 74)",
                "rgb(220 38 38)",
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
  }, [token]);

  return (
    <article className={cn("rounded-lg bg-[rgb(8,11,28)]", className)} {...props}>
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
                labels: {
                  color: "rgb(250 204 21)",
                  boxWidth: 12,
                },
                title: {
                  text: "Resumen",
                  color: "rgb(250 204 21)",
                  font: { size: 23, weight: "bolder" },
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
                top: 4,
                bottom: 4,
                left: 25,
              },
            },
          }}
        />
      )}
    </article>
  );
}
