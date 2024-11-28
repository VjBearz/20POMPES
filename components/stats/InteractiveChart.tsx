"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DataPoint {
  time: string;
  value: number;
}

interface InteractiveChartProps {
  data: DataPoint[];
  title: string;
  description?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
      <p className="text-sm text-white">{label}</p>
      <p className="text-lg font-bold text-[#FFD700]">{payload[0].value} push-ups</p>
    </div>
  );
};

export function InteractiveChart({
  data,
  title,
  description,
}: InteractiveChartProps) {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = (point: DataPoint) => {
    setSelectedPoint(point);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="time"
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FFD700"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: "#FFD700",
                    strokeWidth: 0,
                    cursor: "pointer",
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#FFD700",
                    stroke: "#000",
                    strokeWidth: 2,
                  }}
                  onClick={(point) => handleClick(point.payload)}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Detailed View - {selectedPoint?.time}</DialogTitle>
          </DialogHeader>
          {selectedPoint && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Push-ups</p>
                  <p className="text-2xl font-bold">{selectedPoint.value}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="text-2xl font-bold">{selectedPoint.time}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}