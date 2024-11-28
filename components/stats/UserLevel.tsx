"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useWorkoutStore } from "@/lib/storage";

export function UserLevel() {
  const { level, xp } = useWorkoutStore();
  const xpForNextLevel = level * 100;
  const currentLevelXp = xp % 100;
  const progress = (currentLevelXp / xpForNextLevel) * 100;

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-[#FFD700]" />
          Level Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-bold">Level {level}</span>
            <Zap className="h-5 w-5 text-[#FFD700]" />
          </motion.div>
          <span className="text-sm text-zinc-400">
            {currentLevelXp}/{xpForNextLevel} XP
          </span>
        </div>

        <Progress value={progress} className="h-2" />

        <p className="text-sm text-center text-zinc-400">
          {xpForNextLevel - currentLevelXp} XP until next level
        </p>
      </CardContent>
    </Card>
  );
}