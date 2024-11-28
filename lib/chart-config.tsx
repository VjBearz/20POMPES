"use client";

import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export const chartConfig = {
  xAxis: {
    stroke: "#888888",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
  },
  yAxis: {
    stroke: "#888888",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
  },
  line: {
    type: "monotone" as const,
    strokeWidth: 2,
    dot: false,
  },
};

export function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Push-ups
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}