"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { fetchStatusMetrics } from "@/lib/data/metrics";
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
        "flex flex-col items-center justify-center shadow-lg bg-slate-100 rounded-xl",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <Skeleton className="h-max w-full" />
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
}
