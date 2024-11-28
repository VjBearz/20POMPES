"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Timer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GuidedWorkoutProps {
  onComplete: (count: number) => void;
}

export function GuidedWorkout({ onComplete }: GuidedWorkoutProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const { toast } = useToast();
  const progress = ((60 - timeLeft) / 60) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onComplete(10);
            toast({
              title: "Workout Complete! 🎉",
              description: "Great job! Take a short rest before the next set.",
            });
            return 60;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-[#FFD700]" />
          Guided Workout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Time Remaining</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
          <Progress value={progress} />
          <Button
            className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C]"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause Workout
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Start Guided Workout
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}