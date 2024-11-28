"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Trophy, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useToast } from "@/components/ui/use-toast";

interface DailyChallengeProps {
  onComplete: (count: number) => void;
}

export function DailyChallenge({ onComplete }: DailyChallengeProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [pushupCount, setPushupCount] = useState(0);
  const { toast } = useToast();
  const targetPushups = 20;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (pushupCount >= targetPushups) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast({
          title: "Challenge Complete! 🎉",
          description: `You did ${pushupCount} push-ups in 2 minutes!`,
        });
        onComplete(pushupCount);
      } else {
        toast({
          title: "Challenge Failed",
          description: "Keep practicing! You'll get there.",
          variant: "destructive",
        });
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, pushupCount, onComplete, toast]);

  const handleStart = () => {
    setIsActive(true);
    setPushupCount(0);
    setTimeLeft(120);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(120);
    setPushupCount(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#FFD700]" />
            Daily Challenge
          </span>
          {isActive && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleStop}
              className="hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isActive ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-[#FFD700]" />
                  <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
                </div>
                <span className="text-2xl font-bold">{pushupCount}/{targetPushups}</span>
              </div>
              <Progress value={(pushupCount / targetPushups) * 100} />
              <Button 
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C]"
                onClick={() => setPushupCount(p => p + 1)}
              >
                +1 Push-up
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <p className="text-zinc-400">
                Complete {targetPushups} push-ups in 2 minutes to earn a badge!
              </p>
              <Button 
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C]"
                onClick={handleStart}
              >
                Start Challenge
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}