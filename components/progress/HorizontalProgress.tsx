"use client";

import { cn } from "@/lib/utils";

interface HorizontalProgressProps {
  days: {
    day: string;
    completed: boolean;
    value: number;
  }[];
  weeklyTarget: number;
  currentTotal: number;
}

export function HorizontalProgress({
  days,
  weeklyTarget,
  currentTotal,
}: HorizontalProgressProps) {
  const progress = (currentTotal / weeklyTarget) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day.day}
            className="flex flex-col items-center space-y-2"
          >
            <div
              className={cn(
                "h-20 w-full rounded-lg transition-colors",
                day.completed ? "bg-[#FFD700]" : "bg-muted"
              )}
            >
              <div
                className="h-full bg-[#FFD700] rounded-lg transition-all duration-500"
                style={{
                  width: day.completed ? "100%" : `${(day.value / (weeklyTarget / 7)) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs font-medium">{day.day}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Weekly Progress</span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FFD700] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Current: {currentTotal}</span>
        <span className="text-muted-foreground">Target: {weeklyTarget}</span>
      </div>
    </div>
  );
}