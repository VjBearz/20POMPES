"use client";

import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface QuickAddMenuProps {
  onAdd: (count: number) => void;
  onUndo?: () => void;
}

export function QuickAddMenu({ onAdd, onUndo }: QuickAddMenuProps) {
  const { toast } = useToast();

  const handleAdd = (count: number) => {
    onAdd(count);
    toast({
      title: `Added ${count} push-ups!`,
      description: "Keep up the good work!",
      action: onUndo ? {
        label: "Undo",
        onClick: onUndo,
      } : undefined,
    });
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="flex justify-center gap-4 p-4 border-b border-zinc-800"
    >
      {[1, 5, 10].map((count) => (
        <button
          key={count}
          onClick={() => handleAdd(count)}
          className="w-20 h-12 bg-zinc-900 border border-[#FFD700] rounded-lg text-[#FFD700] hover:bg-zinc-800 transition-colors"
        >
          +{count}
        </button>
      ))}
    </motion.div>
  );
}