"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { fetchModalityMetrics } from "@/lib/data/metrics";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ModalityProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Modality({
  className,
  token,
  ...props
}: ModalityProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchModalityMetrics({ token }).then(({ success, data }) => {
      if (success) {
        const values = {
          labels: data.response.labels,
          datasets: [
            {
              label: "Postulaciones",
              data: data.response.data,
              backgroundColor: [
                "rgb(233 213 255)",
                "rgb(226 232 240)",
                "rgb(254 215 170)",
              ],
              borderColor: [
                "rgb(147 51 234)",
                "rgb(71 85 105)",
                "rgb(234 88 12)",
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
    <article
      className={cn("flex rounded-lg bg-slate-50 shadow-md", className)}
      {...props}
    >
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <div className="relative flex h-full w-full flex-col pb-3 pl-3 pt-7">
          <div className="absolute left-5 top-1 z-10">
            <span className="text-2xl font-bold text-slate-900">
              Modalidades
            </span>
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
                  backgroundColor: "rgb(15 23 42)",
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
