"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  current: number;
  target: number;
}

export function CircularProgress({
  progress,
  size = 200,
  strokeWidth = 12,
  current,
  target,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  const isNearComplete = progress >= 90;
  const isComplete = progress >= 100;

  const handleComplete = () => {
    if (isComplete) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            className="stroke-muted"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <motion.circle
            className={cn(
              "transition-all duration-700 ease-out",
              isNearComplete ? "stroke-[url(#gradient)]" : "stroke-[#FFD700]"
            )}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            onAnimationComplete={handleComplete}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#00FF00" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className={cn(
          "text-4xl font-bold transition-all duration-300",
          isComplete && "text-[#FFD700] celebrate"
        )}>
          {progress}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">
          {current} / {target}
        </span>
      </motion.div>
    </div>
  );
}