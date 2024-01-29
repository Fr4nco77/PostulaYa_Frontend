"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { fetchFeelings } from "@/lib/data/metrics";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
);

interface FeelingsProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Feelings({
  className,
  token,
  ...props
}: FeelingsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchFeelings({ token }).then(({ success, data }) => {
      if (success) {
        const values = {
          labels: data.response.labels,
          datasets: [
            {
              label: "Resumen Emocional de Entrevistas",
              data: data.response.data,
              Filler: true,
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
        <Bar data={chartData} />
      )}
    </div>
  );
}
