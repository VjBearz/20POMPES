"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, Play, Pause, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { DurationSelector } from "./DurationSelector";
import { ChallengeCompletionDialog } from "./ChallengeCompletionDialog";

interface TimedChallengeProps {
  onComplete: (count: number) => void;
}

const PREP_TIME = 5; // 5 seconds preparation

export function TimedChallenge({ onComplete }: TimedChallengeProps) {
  const [status, setStatus] = useState<"idle" | "preparing" | "active" | "completed">("idle");
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(selectedDuration);
  const [prepTimeLeft, setPrepTimeLeft] = useState(PREP_TIME);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const { toast } = useToast();

  const playSound = useCallback((frequency: number, duration: number) => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "preparing" && prepTimeLeft > 0) {
      interval = setInterval(() => {
        setPrepTimeLeft((prev) => {
          if (prev <= 1) {
            setStatus("active");
            playSound(880, 0.2); // High beep for start
            return PREP_TIME;
          }
          playSound(440, 0.1); // Lower beep for countdown
          return prev - 1;
        });
      }, 1000);
    } else if (status === "active" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setStatus("completed");
            playSound(660, 0.3); // Medium beep for completion
            setShowCompletionDialog(true);
            return selectedDuration;
          }
          if (prev === Math.floor(selectedDuration / 2)) {
            playSound(550, 0.2); // Halfway notification
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, prepTimeLeft, timeLeft, playSound, selectedDuration]);

  const handleStart = () => {
    setStatus("preparing");
    setTimeLeft(selectedDuration);
    setPrepTimeLeft(PREP_TIME);
  };

  const handleReset = () => {
    setStatus("idle");
    setTimeLeft(selectedDuration);
    setPrepTimeLeft(PREP_TIME);
  };

  const handleSaveResult = (count: number) => {
    onComplete(count);
    toast({
      title: "Result saved!",
      description: `${count} push-ups added to your daily progress.`,
    });
    handleReset();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-[#FFD700]" />
              Timed Challenge
            </div>
            {status !== "idle" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {status === "idle" ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <DurationSelector
                  value={selectedDuration}
                  onChange={setSelectedDuration}
                />
                <Button
                  className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C]"
                  onClick={handleStart}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Challenge
                </Button>
              </motion.div>
            ) : status === "preparing" ? (
              <motion.div
                key="preparing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                <div className="flex justify-center">
                  <span className="text-6xl font-bold text-[#FFD700]">
                    {prepTimeLeft}
                  </span>
                </div>
                <p className="text-center text-zinc-400">Get ready!</p>
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-center">
                  <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
                </div>
                <Progress
                  value={(timeLeft / selectedDuration) * 100}
                  className="h-2"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <ChallengeCompletionDialog
        open={showCompletionDialog}
        onClose={() => setShowCompletionDialog(false)}
        duration={selectedDuration}
        onSave={handleSaveResult}
      />
    </>
  );
}