"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { fetchModalityMetrics } from "@/lib/data/metrics";
import { PolarArea } from "react-chartjs-2";
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
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

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
        <PolarArea data={chartData} />
      )}
    </div>
  );
}
