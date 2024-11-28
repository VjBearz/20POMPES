"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeEstimateProps {
  currentCount: number;
  dailyGoal: number;
  averagePushUpsPerHour: number;
}

export function TimeEstimate({
  currentCount,
  dailyGoal,
  averagePushUpsPerHour,
}: TimeEstimateProps) {
  const remaining = dailyGoal - currentCount;
  const estimatedHours = remaining > 0 ? Math.ceil(remaining / averagePushUpsPerHour) : 0;

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#FFD700]" />
          Time Estimate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {remaining > 0 ? (
            <>
              <p className="text-2xl font-bold">
                {estimatedHours} hour{estimatedHours !== 1 ? "s" : ""} remaining
              </p>
              <p className="text-sm text-zinc-400">
                Based on your current pace of {averagePushUpsPerHour} push-ups per hour,
                you need {remaining} more push-ups to reach your daily goal.
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-[#FFD700]">Goal Completed! 🎉</p>
              <p className="text-sm text-zinc-400">
                You've reached your daily goal of {dailyGoal} push-ups. Great work!
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}