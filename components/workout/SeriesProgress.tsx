"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface SeriesProgressProps {
  completedSets: number;
  totalSets: number;
  nextSetTime?: string;
}

export function SeriesProgress({ completedSets, totalSets, nextSetTime }: SeriesProgressProps) {
  const progress = (completedSets / totalSets) * 100;

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#FFD700]" />
          Today&apos;s Sets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{completedSets}/{totalSets}</span>
          {nextSetTime && (
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Clock className="h-4 w-4 text-[#FFD700]" />
              <span>Next set at {nextSetTime}</span>
            </motion.div>
          )}
        </div>

        <Progress value={progress} className="h-2" />

        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: totalSets }).map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full ${
                index < completedSets ? 'bg-[#FFD700]' : 'bg-zinc-800'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>

        {completedSets === totalSets ? (
          <p className="text-sm text-center text-[#FFD700]">
            All sets completed! Great job! 🎉
          </p>
        ) : (
          <p className="text-sm text-center text-muted-foreground">
            Keep going! You&apos;re doing great!
          </p>
        )}
      </CardContent>
    </Card>
  );
}