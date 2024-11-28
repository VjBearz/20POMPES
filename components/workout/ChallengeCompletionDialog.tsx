"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Award, TrendingUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface ChallengeCompletionDialogProps {
  open: boolean;
  onClose: () => void;
  duration: number;
  onSave: (count: number) => void;
}

export function ChallengeCompletionDialog({
  open,
  onClose,
  duration,
  onSave,
}: ChallengeCompletionDialogProps) {
  const [pushupCount, setPushupCount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    const count = parseInt(pushupCount, 10);
    if (!count || count < 0) return;

    setIsSubmitting(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onSave(count);
    setIsSubmitting(false);
    onClose();
    setPushupCount("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#FFD700]" />
            Challenge Complete!
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
              <span>Duration</span>
            </div>
            <span className="text-lg font-bold">{duration} seconds</span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              How many push-ups did you complete?
            </label>
            <Input
              type="number"
              min="0"
              value={pushupCount}
              onChange={(e) => setPushupCount(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter number of push-ups"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <TrendingUp className="h-4 w-4" />
            <span>This will be added to your daily progress</span>
          </div>
        </motion.div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!pushupCount || isSubmitting}
            className="bg-[#FFD700] text-black hover:bg-[#FFE55C]"
          >
            Save Result
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}