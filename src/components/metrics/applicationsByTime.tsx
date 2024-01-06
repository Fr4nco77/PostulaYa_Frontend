"use client";

import { useState, useEffect } from "react";
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
import { fetchApplicationsByTime } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

export default function ApplicationsByTime({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any>(null);
  const [period, setPeriod] = useState<"day" | "month">("day");

  useEffect(() => {
    fetchApplicationsByTime({ token, period }).then(({ success, data }) => {
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
            label: "Postulaciones",
            data: data.response.data,
          },
        ],
      };
      setChartData(values);
      setIsLoading(false);
    });
  }, [period]);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Select
            name="period"
            defaultValue={period}
            onValueChange={(value: "day" | "month") => setPeriod(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Diario</SelectItem>
              <SelectItem value="month">Mensual</SelectItem>
            </SelectContent>
          </Select>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}
