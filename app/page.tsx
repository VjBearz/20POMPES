"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Flame, Trophy } from "lucide-react";
import { DailyProgress } from "@/components/DailyProgress";
import { WorkoutHistory } from "@/components/WorkoutHistory";
import { TimedChallenge } from "@/components/workout/TimedChallenge";
import { EnduranceChallenge } from "@/components/workout/EnduranceChallenge";
import { Navigation } from "@/components/layout/Navigation";
import { DailyQuote } from "@/components/motivation/DailyQuote";
import { BadgeDisplay } from "@/components/badges/BadgeDisplay";
import { SeriesProgress } from "@/components/workout/SeriesProgress";
import { Toaster } from "@/components/ui/toaster";

const recentBadges = [
  {
    id: "1",
    name: "First Mile",
    description: "Complete your first 20 push-ups",
    icon: "Trophy",
    earned: true,
    earnedDate: "2024-02-28",
  },
  {
    id: "2",
    name: "Streak Master",
    description: "7 days streak",
    icon: "Zap",
    earned: true,
    earnedDate: "2024-02-27",
  },
];

export default function Home() {
  const [pushupCount, setPushupCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [completedSets, setCompletedSets] = useState(1);
  const totalSets = 3;
  const nextSetTime = "17:00";

  const handleAdd = (count: number) => {
    setPushupCount((prev) => prev + count);
    setHistory((prev) => [...prev, count]);
    if (count >= 10) {
      setCompletedSets((prev) => Math.min(prev + 1, totalSets));
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastCount = history[history.length - 1];
      setPushupCount((prev) => prev - lastCount);
      setHistory((prev) => prev.slice(0, -1));
      if (lastCount >= 10) {
        setCompletedSets((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-24">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Twenty Punch</h1>
          <p className="text-muted-foreground">Your daily push-up challenge</p>
        </div>
        <Dumbbell className="h-10 w-10 text-[#FFD700]" />
      </header>

      <DailyQuote />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-[#FFD700]" />
              Today&apos;s Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DailyProgress pushupCount={pushupCount} />
          </CardContent>
        </Card>

        <SeriesProgress 
          completedSets={completedSets}
          totalSets={totalSets}
          nextSetTime={nextSetTime}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TimedChallenge onComplete={handleAdd} />
        <EnduranceChallenge onComplete={handleAdd} />
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#FFD700]" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WorkoutHistory />
        </CardContent>
      </Card>

      <BadgeDisplay recentBadges={recentBadges} />

      <Navigation onAdd={handleAdd} onUndo={handleUndo} />
      <Toaster />
    </div>
  );
}