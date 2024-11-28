"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface Challenge {
  id: string;
  date: Date;
  duration: number;
  pushups: number;
  isPersonalBest: boolean;
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    date: new Date(2024, 1, 28),
    duration: 60,
    pushups: 25,
    isPersonalBest: true,
  },
  {
    id: "2",
    date: new Date(2024, 1, 27),
    duration: 45,
    pushups: 18,
    isPersonalBest: false,
  },
  {
    id: "3",
    date: new Date(2024, 1, 26),
    duration: 60,
    pushups: 22,
    isPersonalBest: false,
  },
];

export function ChallengeHistory() {
  const [selectedDuration, setSelectedDuration] = useState<number | "all">("all");

  const filteredChallenges = mockChallenges.filter(
    (challenge) => selectedDuration === "all" || challenge.duration === selectedDuration
  );

  const durations = Array.from(
    new Set(mockChallenges.map((challenge) => challenge.duration))
  );

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#FFD700]" />
            Challenge History
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDuration("all")}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDuration === "all"
                  ? "bg-[#FFD700] text-black"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              All
            </button>
            {durations.map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedDuration === duration
                    ? "bg-[#FFD700] text-black"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {duration}s
              </button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-800"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-400">
                      {format(challenge.date, "MMM d, yyyy")}
                    </span>
                    <span className="font-medium">
                      {challenge.pushups} push-ups
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-zinc-400">Duration</span>
                    <span className="font-medium">{challenge.duration}s</span>
                  </div>
                  {challenge.isPersonalBest && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFD700] text-black">
                      <Award className="h-4 w-4" />
                      <span className="text-xs font-medium">PB</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Average: {
                  Math.round(
                    filteredChallenges.reduce((acc, curr) => acc + curr.pushups, 0) /
                    filteredChallenges.length
                  )
                } push-ups</span>
              </div>
              <span>Total Challenges: {filteredChallenges.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}