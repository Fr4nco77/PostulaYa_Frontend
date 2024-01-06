"use client";

import { useState, useEffect } from "react";
import { fetchModalityMetrics } from "@/lib/data";
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

export default function Modality({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchModalityMetrics({ token }).then(({ success, data }) => {
      if (!success) {
        return (
          <div>
            <h1>{data.name}</h1>
            <span>{data.message}</span>
          </div>
        );
      }
      const values = {
        labels: data.response.labels,
        datasets: [
          {
            label: "# de Postulaciones",
            data: data.response.data,
          },
        ],
      };
      setChartData(values);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>{isLoading ? <div>Loading...</div> : <PolarArea data={chartData} />}</div>
  );
}
