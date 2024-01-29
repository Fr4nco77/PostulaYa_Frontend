"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { fetchSkillsMetrics } from "@/lib/data/metrics";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
);

interface SkillsProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Skills({ className, token, ...props }: SkillsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchSkillsMetrics({ token }).then(({ success, data }) => {
      if (success) {
        const values = {
          labels: data.response.labels,
          datasets: [
            {
              label: "Habilidades",
              data: data.response.data,
            },
          ],
        };
        setChartData(values);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl bg-slate-100 shadow-lg",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
}
