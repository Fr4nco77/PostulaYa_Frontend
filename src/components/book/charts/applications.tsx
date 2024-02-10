"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { fetchApplicationsByTime } from "@/lib/data/metrics";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
);

interface ApplicationsProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function ApplicationsByTime({
  className,
  token,
  ...props
}: ApplicationsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchApplicationsByTime({ token, period: "day" }).then(
      ({ success, data }) => {
        if (success) {
          const values = {
            labels: data.response.labels,
            datasets: [
              {
                label: "Postulaciones",
                data: data.response.data,
                backgroundColor: "rgb(250 204 21)",
                borderColor: "rgb(250 204 21)",
                tension: 0.4,
              },
            ],
          };
          setChartData(values);
          setIsLoading(false);
        }
      },
    );
  }, [token]);

  return (
    <article className={cn("rounded-lg bg-[rgb(8,11,28)]", className)} {...props}>
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "rgb(250 204 21)",
                },
                grid: {
                  color: "rgb(248 250 252)",
                },
              },
              x: {
                ticks: {
                  color: "rgb(250 204 21)",
                },
                grid: {
                  color: "rgb(248 250 252)",
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                displayColors: false,
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 20,
              },
            },
          }}
        />
      )}
    </article>
  );
}
