"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Star, Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/lib/badges/types";

const icons = {
  Trophy,
  Award,
  Star,
  Flame,
  Zap,
};

interface BadgeProgressProps {
  badge: Badge;
  progress: number;
  total: number;
}

export function BadgeProgress({ badge, progress, total }: BadgeProgressProps) {
  const Icon = icons[badge.icon as keyof typeof icons];
  const progressPercentage = (progress / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className={`bg-zinc-900 border-zinc-800 ${
        progressPercentage >= 100 ? 'border-[#FFD700]' : ''
      }`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`rounded-full p-3 ${
              progressPercentage >= 100 ? 'bg-[#FFD700]' : 'bg-zinc-800'
            }`}>
              <Icon className={`h-6 w-6 ${
                progressPercentage >= 100 ? 'text-black' : 'text-[#FFD700]'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{badge.name}</h3>
              <p className="text-sm text-zinc-400">{badge.description}</p>
              <div className="mt-2 space-y-2">
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>{progress}</span>
                  <span>{total}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}