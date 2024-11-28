"use client";

import { CircularProgress } from "@/components/progress/CircularProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface DailyProgressProps {
  pushupCount: number;
}

export function DailyProgress({ pushupCount }: DailyProgressProps) {
  const dailyGoal = 20;
  const progress = (pushupCount / dailyGoal) * 100;

  return (
    <div className="flex flex-col items-center space-y-4">
      <CircularProgress
        progress={Math.min(progress, 100)}
        current={pushupCount}
        target={dailyGoal}
      />
      <div className="w-full flex justify-between text-sm text-muted-foreground">
        <span>Today's Goal</span>
        <span>{dailyGoal} push-ups</span>
      </div>
    </div>
  );
}