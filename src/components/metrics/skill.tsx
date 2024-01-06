"use client";

import { useState, useEffect } from "react";
import { fetchSkillsMetrics } from "@/lib/data";
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

export default function Skills({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchSkillsMetrics({ token }).then(({ success, data }) => {
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
            label: "# de Habilidades",
            data: data.response.data,
          },
        ],
      };
      setChartData(values);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>{isLoading ? <div>Loading...</div> : <Pie data={chartData} />}</div>
  );
}
