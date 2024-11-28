"use client";

import { useToast } from "@/components/ui/use-toast";
import { MotivationalMessage } from "@/lib/motivation/messages";
import confetti from "canvas-confetti";

export function useMotivationalToast() {
  const { toast } = useToast();

  const showMotivationalToast = (message: MotivationalMessage) => {
    if (message.type === 'achievement') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    toast({
      title: message.text,
      className: "bg-zinc-900 border-[#FFD700]",
    });
  };

  return { showMotivationalToast };
}