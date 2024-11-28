"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DurationSelectorProps {
  value: number;
  onChange: (duration: number) => void;
}

const durations = [
  { label: "30s", value: 30 },
  { label: "45s", value: 45 },
  { label: "1m", value: 60 },
  { label: "2m", value: 120 },
];

export function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {durations.map((duration) => (
        <motion.div
          key={duration.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={value === duration.value ? "default" : "outline"}
            className={`w-full ${
              value === duration.value
                ? "bg-[#FFD700] text-black hover:bg-[#FFE55C]"
                : "hover:bg-zinc-800"
            }`}
            onClick={() => onChange(duration.value)}
          >
            {duration.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}