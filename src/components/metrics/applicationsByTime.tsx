"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  PointElement,
} from "chart.js";
import { fetchApplicationsByTime } from "@/lib/data/metrics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, PointElement);

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
  const [period, setPeriod] = useState<"day" | "month">("day");

  useEffect(() => {
    fetchApplicationsByTime({ token, period }).then(({ success, data }) => {
      if (success) {
        const values = {
          labels: data.response.labels,
          datasets: [
            {
              label: "Postulaciones",
              data: data.response.data,
              backgroundColor: "rgb(250 204 21)",
              borderColor: "rgb(15 23 42)",
              tension: 0.4,
            },
          ],
        };
        setChartData(values);
        setIsLoading(false);
      }
    });
  }, [period, token]);

  return (
    <article
      className={cn("flex rounded-lg bg-slate-50 shadow-md", className)}
      {...props}
    >
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <div className="relative flex h-full w-full p-3 pt-7">
          <div className="absolute left-8 top-1 z-10">
            <span className="text-2xl font-bold text-slate-900">Actividad</span>
          </div>
          <div className="absolute right-5 top-1 z-10">
            <Select
              name="period"
              defaultValue={period}
              onValueChange={(value: "day" | "month") => setPeriod(value)}
            >
              <SelectTrigger className="h-7">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="day"
                  className="focus:bg-slate-900 focus:text-yellow-400"
                >
                  Diario
                </SelectItem>
                <SelectItem
                  value="month"
                  className="focus:bg-slate-900 focus:text-yellow-400"
                >
                  Mensual
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
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
