"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, Target, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { InteractiveChart } from "@/components/stats/InteractiveChart";
import { WeeklyProgress } from "@/components/stats/WeeklyProgress";
import { TimeEstimate } from "@/components/stats/TimeEstimate";
import { ChallengeHistory } from "@/components/challenges/ChallengeHistory";
import { BadgesOverview } from "@/components/badges/BadgesOverview";
import { PersonalRecords } from "@/components/stats/PersonalRecords";
import { ProgressInsights } from "@/components/stats/ProgressInsights";
import { useWorkoutProgress } from "@/lib/storage/hooks";

export default function Statistics() {
  const [selectedView, setSelectedView] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const { dailyProgress, weeklyProgress, stats, settings } = useWorkoutProgress();

  const mockTimeData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    value: Math.floor(Math.random() * 10),
  }));

  return (
    <div className="container mx-auto p-4 space-y-6 pb-24">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <div className="flex gap-2">
          {["weekly", "monthly", "yearly"].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view as typeof selectedView)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedView === view
                  ? "bg-[#FFD700] text-black"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <PersonalRecords />
      
      <div className="grid gap-6 md:grid-cols-2">
        <InteractiveChart
          data={mockTimeData}
          title="Daily Distribution"
          description="Push-ups completed throughout the day"
        />
        <WeeklyProgress />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TimeEstimate
          currentCount={dailyProgress}
          dailyGoal={settings.dailyGoal}
          averagePushUpsPerHour={5}
        />
        <ProgressInsights />
      </div>

      <ChallengeHistory />
      <BadgesOverview />
    </div>
  );
}