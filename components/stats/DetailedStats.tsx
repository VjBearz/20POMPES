"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { defaultChartConfig } from "@/components/charts/ChartConfig";

interface DetailedStatsProps {
  open: boolean;
  onClose: () => void;
  data: {
    hour: string;
    count: number;
  }[];
  date: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
      <p className="text-sm text-white">{label}</p>
      <p className="text-lg font-bold text-[#FFD700]">{payload[0].value} push-ups</p>
    </div>
  );
};

export function DetailedStats({ open, onClose, data, date }: DetailedStatsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Detailed Progress - {date}</DialogTitle>
        </DialogHeader>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="hour"
                stroke={defaultChartConfig.xAxis.stroke}
                fontSize={defaultChartConfig.xAxis.fontSize}
                tickLine={defaultChartConfig.xAxis.tickLine}
                axisLine={defaultChartConfig.xAxis.axisLine}
                padding={defaultChartConfig.xAxis.padding}
              />
              <YAxis
                stroke={defaultChartConfig.yAxis.stroke}
                fontSize={defaultChartConfig.yAxis.fontSize}
                tickLine={defaultChartConfig.yAxis.tickLine}
                axisLine={defaultChartConfig.yAxis.axisLine}
                width={defaultChartConfig.yAxis.width}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#FFD700"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}