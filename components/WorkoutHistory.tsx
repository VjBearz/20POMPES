"use client";

import { LineChart } from "@/components/charts/LineChart";
import { workoutData } from "@/lib/mock-data";

export function WorkoutHistory() {
  return <LineChart data={workoutData} dataKey="pushups" xAxisKey="day" />;
}