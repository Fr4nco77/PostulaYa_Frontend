"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { fetchStatusMetrics } from "@/lib/data/metrics";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

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
                "rgb(71 85 105)",
                "rgb(22 163 74)",
                "rgb(220 38 38)",
              ],
              borderWidth: 2,
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
    <article
      className={cn("flex rounded-lg bg-slate-50 shadow-md", className)}
      {...props}
    >
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <div className="relative flex h-full w-full flex-col pb-3 pl-3 pt-7">
          <div className="absolute left-5 top-1 z-10">
            <span className="text-2xl font-bold text-slate-900">Resumen</span>
          </div>
          <Doughnut
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "left",
                  labels: {
                    boxWidth: 12,
                  },
                },
                tooltip: {
                  backgroundColor:"rgb(15 23 42)",
                  titleColor: "rgb(250 204 21)",
                },
              },
              animation: {
                animateRotate: true,
                animateScale: true,
              },
            }}
          />
        </div>
      )}
    </article>
  );
}
