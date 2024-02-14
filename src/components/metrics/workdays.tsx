"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { fetchWorkdaysMetrics } from "@/lib/data/metrics";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

interface TypesProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Workdays({ className, token, ...props }: TypesProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchWorkdaysMetrics({ token }).then(({ success, data }) => {
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
              Jornadas
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
