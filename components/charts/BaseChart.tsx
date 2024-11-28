"use client";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { defaultChartConfig } from "./ChartConfig";

interface BaseChartProps {
  children: React.ReactNode;
  data: any[];
  height?: number | string;
  width?: number | string;
}

export function BaseChart({
  children,
  data,
  height = "100%",
  width = "100%",
}: BaseChartProps) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width={width} height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

interface ChartAxisProps {
  dataKey?: string;
  stroke?: string;
  fontSize?: number;
  tickLine?: boolean;
  axisLine?: boolean;
  padding?: { left: number; right: number };
  width?: number;
}

export function ChartXAxis({ 
  dataKey = "", 
  stroke = defaultChartConfig.xAxis.stroke,
  fontSize = defaultChartConfig.xAxis.fontSize,
  tickLine = defaultChartConfig.xAxis.tickLine,
  axisLine = defaultChartConfig.xAxis.axisLine,
  padding = defaultChartConfig.xAxis.padding
}: ChartAxisProps) {
  return (
    <XAxis
      dataKey={dataKey}
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      axisLine={axisLine}
      padding={padding}
    />
  );
}

export function ChartYAxis({ 
  stroke = defaultChartConfig.yAxis.stroke,
  fontSize = defaultChartConfig.yAxis.fontSize,
  tickLine = defaultChartConfig.yAxis.tickLine,
  axisLine = defaultChartConfig.yAxis.axisLine,
  width = defaultChartConfig.yAxis.width
}: ChartAxisProps) {
  return (
    <YAxis
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      axisLine={axisLine}
      width={width}
      tickFormatter={(value) => `${value}`}
    />
  );
}

export function ChartGrid() {
  return (
    <CartesianGrid
      strokeDasharray={defaultChartConfig.grid.strokeDasharray}
      stroke={defaultChartConfig.grid.stroke}
    />
  );
}

export function ChartTooltip() {
  return (
    <Tooltip
      content={({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
          <div className="rounded-lg border bg-zinc-900 p-3 shadow-md">
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="text-lg font-bold text-[#FFD700]">
              {payload[0].value} push-ups
            </p>
          </div>
        );
      }}
    />
  );
}