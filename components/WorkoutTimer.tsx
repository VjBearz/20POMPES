"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface WorkoutTimerProps {
  isActive: boolean;
  onComplete: () => void;
}

export function WorkoutTimer({ isActive, onComplete }: WorkoutTimerProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const progress = ((60 - timeLeft) / 60) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            onComplete();
            return 60;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!isActive) {
      setTimeLeft(60);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Time Remaining</span>
        <span>{timeLeft}s</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}