"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { Radar } from "react-chartjs-2";
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
  RadialLinearScale,
  LineElement,
} from "chart.js";
import { fetchPlatforms } from "@/lib/data/metrics";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
  RadialLinearScale,
);

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
        <Radar data={chartData} />
      )}
    </div>
  );
}
