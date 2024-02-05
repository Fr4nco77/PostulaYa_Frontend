"use client";

import { useState, useEffect, HTMLAttributes } from "react";
import { fetchModalityMetrics } from "@/lib/data/metrics";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ModalityProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default function Modalitys({
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
              backgroundColor: [
                "rgb(233 213 255)",
                "rgb(226 232 240)",
                "rgb(254 215 170)",
              ],
              borderColor: [
                "rgb(147 51 234)",
                "rgb(71 85 105)",
                "rgb(234 88 12)",
              ],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        };
        setChartData(values);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div className={cn("rounded-lg bg-[rgb(8,11,28)]", className)} {...props}>
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <Doughnut
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "left",
                maxWidth: 150,
                labels: {
                  color: "rgb(250 204 21)",
                  boxWidth: 12,
                },
                title: {
                  text: "Modalidades",
                  color: "rgb(250 204 21)",
                  font: { size: 16, weight: "bolder" },
                  display: true,
                },
              },
            },
            animation: {
              animateRotate: true,
              animateScale: true,
            },
            layout: {
              padding: {
                top: 5,
                bottom: 5,
                left: 15,
              },
            },
          }}
        />
      )}
    </div>
  );
}
