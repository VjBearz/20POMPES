"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Zap, Target, Award } from "lucide-react";
import { motion } from "framer-motion";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof icons;
  earned: boolean;
  earnedDate?: string;
}

const icons = {
  Trophy,
  Star,
  Zap,
  Target,
  Award,
};

interface BadgeDisplayProps {
  recentBadges: Badge[];
}

export function BadgeDisplay({ recentBadges }: BadgeDisplayProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-[#FFD700]" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {recentBadges.map((badge) => {
            const Icon = icons[badge.icon];
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  badge.earned ? 'bg-[#FFD700] text-black' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                <Icon className="h-5 w-5" />
                <div>
                  <p className="font-medium">{badge.name}</p>
                  <p className="text-xs">{badge.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}