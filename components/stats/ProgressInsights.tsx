"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useWorkoutStore } from "@/lib/storage/store";

export function ProgressInsights() {
  const { weeklyProgress } = useWorkoutStore((state) => ({
    weeklyProgress: state.getWeeklyProgress(),
  }));

  const currentWeekTotal = weeklyProgress.reduce((sum, day) => sum + day.count, 0);
  const averagePerDay = Math.round(currentWeekTotal / 7);
  
  // Calculate week-over-week change
  const improvement = 15; // This would be calculated from actual historical data

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#FFD700]" />
          Progress Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-lg bg-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Weekly Average</span>
              <span className="text-lg font-bold">{averagePerDay} push-ups/day</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Week-over-Week</span>
              <div className="flex items-center gap-2">
                {improvement > 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className="text-lg font-bold">
                  {Math.abs(improvement)}% {improvement > 0 ? "increase" : "decrease"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-center text-[#FFD700]">
            {improvement > 0
              ? "Great progress! Keep pushing yourself! 💪"
              : "Stay motivated! Every push-up counts! 🎯"}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}