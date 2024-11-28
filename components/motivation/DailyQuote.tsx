"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [
  "Every push-up makes you stronger than yesterday.",
  "Small progress is still progress.",
  "Your only competition is yourself.",
  "Success is built one push-up at a time.",
  "Stay consistent, stay strong.",
];

export function DailyQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="pt-6">
          <p className="text-lg text-center text-[#FFD700] font-medium italic">
            "{quote}"
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}