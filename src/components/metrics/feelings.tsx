"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip as tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { fetchFeelings } from "@/lib/data/metrics";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "../ui/tooltip";
import { HelpCircle } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, tooltip, PointElement);

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
              label: "Entrevistas",
              data: data.response.data,
              backgroundColor: "rgb(250 204 21)",
              borderColor: "rgb(15 23 42)",
              borderWidth: 2,
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
        <div className="relative flex h-full w-full flex-col p-3 pt-7">
          <div className="absolute left-10 top-1 z-10">
            <span className="text-2xl font-bold text-slate-900">
              Resumen Emocional
            </span>
          </div>
          <div className="z-11 absolute right-1 top-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 text-gray-400 transition duration-300 hover:text-gray-500" />
                </TooltipTrigger>
                <TooltipContent className="w-36 border-slate-600 bg-slate-50 text-xs font-medium text-slate-900">
                  Muesta la distribución de tus estados emocionales en
                  entrevistas.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Bar
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
                  backgroundColor: "rgb(15 23 42)",
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
