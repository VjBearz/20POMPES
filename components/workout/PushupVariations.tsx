"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

const variations = [
  {
    id: "regular",
    name: "Regular",
    difficulty: "Beginner",
    multiplier: 1,
  },
  {
    id: "diamond",
    name: "Diamond",
    difficulty: "Advanced",
    multiplier: 1.5,
  },
  {
    id: "wide",
    name: "Wide Grip",
    difficulty: "Intermediate",
    multiplier: 1.2,
  },
  {
    id: "decline",
    name: "Decline",
    difficulty: "Advanced",
    multiplier: 1.3,
  },
];

interface PushupVariationsProps {
  onSelect: (variation: string, multiplier: number) => void;
}

export function PushupVariations({ onSelect }: PushupVariationsProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-[#FFD700]" />
          Push-up Variations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {variations.map((variation) => (
            <motion.div
              key={variation.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto flex flex-col gap-1 p-4 hover:bg-zinc-800"
                onClick={() => onSelect(variation.id, variation.multiplier)}
              >
                <span className="font-medium">{variation.name}</span>
                <span className="text-xs text-zinc-400">
                  {variation.difficulty}
                </span>
                <span className="text-xs text-[#FFD700]">
                  {variation.multiplier}x XP
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}