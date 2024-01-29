"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
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
              tension: 0.2,
              fallbackContent: <span>Loading...</span>,
            },
          ],
        };
        setChartData(values);
        setIsLoading(false);
      }
    });
  }, [period]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
        <div className="relative flex h-full w-full flex-col items-center justify-end">
          <div className="absolute right-0 top-0 z-10 md:right-5">
            <Select
              name="period"
              defaultValue={period}
              onValueChange={(value: "day" | "month") => setPeriod(value)}
            >
              <SelectTrigger className="h-8 w-20">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Diario</SelectItem>
                <SelectItem value="month">Mensual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Line data={chartData} options={options}/>
        </div>
      )}
    </div>
  );
}
