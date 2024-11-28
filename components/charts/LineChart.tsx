"use client";

import { LineChart as RechartsLineChart, Line } from "recharts";
import { BaseChart, ChartGrid, ChartXAxis, ChartYAxis, ChartTooltip } from "./BaseChart";
import { defaultChartConfig } from "./ChartConfig";

interface LineChartProps {
  data: Array<{
    [key: string]: any;
  }>;
  dataKey: string;
  xAxisKey: string;
}

export function LineChart({ data, dataKey, xAxisKey }: LineChartProps) {
  return (
    <BaseChart data={data}>
      <RechartsLineChart data={data}>
        <ChartGrid />
        <ChartXAxis dataKey={xAxisKey} />
        <ChartYAxis />
        <ChartTooltip />
        <Line
          type={defaultChartConfig.line.type}
          dataKey={dataKey}
          stroke={defaultChartConfig.line.stroke}
          strokeWidth={defaultChartConfig.line.strokeWidth}
          dot={defaultChartConfig.line.dot}
        />
      </RechartsLineChart>
    </BaseChart>
  );
}