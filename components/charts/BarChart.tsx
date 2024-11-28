"use client";

import { BarChart as RechartsBarChart, Bar } from "recharts";
import { BaseChart, ChartGrid, ChartXAxis, ChartYAxis, ChartTooltip } from "./BaseChart";
import { defaultChartConfig } from "./ChartConfig";

interface BarChartProps {
  data: Array<{
    [key: string]: any;
  }>;
  dataKey: string;
  xAxisKey: string;
}

export function BarChart({ data, dataKey, xAxisKey }: BarChartProps) {
  return (
    <BaseChart data={data}>
      <RechartsBarChart data={data}>
        <ChartGrid />
        <ChartXAxis dataKey={xAxisKey} />
        <ChartYAxis />
        <ChartTooltip />
        <Bar
          dataKey={dataKey}
          fill={defaultChartConfig.bar.fill}
          radius={defaultChartConfig.bar.radius}
        />
      </RechartsBarChart>
    </BaseChart>
  );
}