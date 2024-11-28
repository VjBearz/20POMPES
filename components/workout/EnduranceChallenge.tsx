"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Play, Pause, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { ChallengeCompletionDialog } from "./ChallengeCompletionDialog";

interface EnduranceChallengeProps {
  onComplete: (count: number) => void;
}

export function EnduranceChallenge({ onComplete }: EnduranceChallengeProps) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    setTime(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setShowCompletionDialog(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSaveResult = (count: number) => {
    onComplete(count);
    toast({
      title: "Endurance Challenge Complete! 🎉",
      description: `You completed ${count} push-ups in ${formatTime(time)}!`,
    });
    handleReset();
  };

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-[#FFD700]" />
              Endurance Challenge
            </div>
            {isActive && (
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
            {!isActive ? (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-zinc-400">
                  Do as many push-ups as you can! No time limit.
                </p>
                <Button
                  className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C]"
                  onClick={handleStart}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Endurance Challenge
                </Button>
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
                  <span className="text-4xl font-bold font-mono">
                    {formatTime(time)}
                  </span>
                </div>
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleStop}
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Stop Challenge
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <ChallengeCompletionDialog
        open={showCompletionDialog}
        onClose={() => setShowCompletionDialog(false)}
        duration={time}
        onSave={handleSaveResult}
      />
    </>
  );
}