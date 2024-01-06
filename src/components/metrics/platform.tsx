"use client";

import { useState, useEffect } from "react";
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
import { fetchPlatforms } from "@/lib/data";
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
  RadialLinearScale,
);

export default function ApplicationsByTime({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any>(null);
  const [period, setPeriod] = useState<"month" | "year">("month");

  useEffect(() => {
    fetchPlatforms({ token, period }).then(({ success, data }) => {
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
            onValueChange={(value: "month" | "year") => setPeriod(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mensual</SelectItem>
              <SelectItem value="year">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Radar data={chartData} />
        </div>
      )}
    </div>
  );
}
