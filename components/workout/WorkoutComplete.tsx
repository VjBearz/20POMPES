"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { getRandomMessage } from "@/lib/motivation/messages";
import { useMotivationalToast } from "@/components/motivation/MotivationalToast";
import { useEffect } from "react";

interface WorkoutCompleteProps {
  open: boolean;
  onClose: () => void;
  pushupCount: number;
  type: "challenge" | "endurance" | "daily";
  duration?: number;
}

export function WorkoutComplete({
  open,
  onClose,
  pushupCount,
  type,
  duration,
}: WorkoutCompleteProps) {
  const { showMotivationalToast } = useMotivationalToast();

  useEffect(() => {
    if (open) {
      const message = getRandomMessage(type === "daily" ? "progress" : "challenge");
      showMotivationalToast(message);
    }
  }, [open, type, showMotivationalToast]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#FFD700]" />
            Workout Complete!
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#FFD700]" />
              <span>Push-ups</span>
            </div>
            <span className="text-lg font-bold">{pushupCount}</span>
          </div>

          {duration && (
            <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#FFD700]" />
                <span>Duration</span>
              </div>
              <span className="text-lg font-bold">{duration}s</span>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}