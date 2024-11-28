"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { HorizontalProgress } from "@/components/progress/HorizontalProgress";

const mockData = [
  { day: "Mon", completed: true, value: 25 },
  { day: "Tue", completed: true, value: 22 },
  { day: "Wed", completed: false, value: 15 },
  { day: "Thu", completed: true, value: 23 },
  { day: "Fri", completed: false, value: 12 },
  { day: "Sat", completed: true, value: 21 },
  { day: "Sun", completed: false, value: 8 },
];

export function WeeklyProgress() {
  const weeklyTarget = 140; // 20 push-ups per day * 7 days
  const currentTotal = mockData.reduce((sum, day) => sum + day.value, 0);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#FFD700]" />
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <HorizontalProgress
          days={mockData}
          weeklyTarget={weeklyTarget}
          currentTotal={currentTotal}
        />
      </CardContent>
    </Card>
  );
}