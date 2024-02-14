"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  RadialLinearScale,
  Colors,
  Filler
} from "chart.js";
import { fetchPlatforms } from "@/lib/data/metrics";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, RadialLinearScale, Colors, Filler);

interface PlatformsProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Platforms({
  className,
  token,
  ...props
}: PlatformsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchPlatforms({ token }).then(({ success, data }) => {
      if (success) {
        const values = {
          labels: data.response.labels,
          datasets: [
            {
              label: "Postulaciones",
              data: data.response.data,
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
        <div className="relative flex h-full w-full flex-col pb-3 pt-7">
          <div className="absolute left-5 top-1 z-10">
            <span className="text-2xl font-bold text-slate-900">Plataformas</span>
          </div>
          <Radar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  displayColors: false,
                  backgroundColor:"rgb(15 23 42)",
                  titleColor: "rgb(250 204 21)",
                },
              },
            }}
          />
        </div>
      )}
    </article>
  );
}
