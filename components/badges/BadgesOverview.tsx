"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { badges, calculateBadgeProgress } from "@/lib/badges/badges";
import { BadgeProgress } from "./BadgeProgress";
import { useWorkoutStore } from "@/lib/storage/store";

export function BadgesOverview() {
  const stats = useWorkoutStore((state) => ({
    weeklyPushups: state.getWeeklyProgress().reduce((sum, day) => sum + day.count, 0),
    currentStreak: state.stats.dailyStreak,
    challengesCompleted: state.sessions.filter(s => s.type === 'challenge').length,
    personalBest: Math.max(...state.sessions.map(s => s.pushups)),
    maxPushups: Math.max(...state.sessions.map(s => s.pushups)),
  }));

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-[#FFD700]" />
          Badges & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {badges.map((badge) => {
            const progress = calculateBadgeProgress(badge, stats);
            return (
              <BadgeProgress
                key={badge.id}
                badge={badge}
                progress={progress.progress}
                total={progress.total}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}