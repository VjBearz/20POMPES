"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface QuickAddButtonsProps {
  onAdd: (count: number) => void;
  onUndo?: () => void;
}

export function QuickAddButtons({ onAdd, onUndo }: QuickAddButtonsProps) {
  const { toast } = useToast();

  const handleAdd = (count: number) => {
    onAdd(count);
    toast({
      title: `Added ${count} push-ups!`,
      description: "Keep pushing!",
      action: onUndo ? {
        label: "Undo",
        onClick: onUndo,
      } : undefined,
    });
  };

  return (
    <div className="flex justify-center gap-2 p-4 bg-black border-t border-zinc-800">
      {[1, 5, 10].map((count) => (
        <motion.div
          key={count}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleAdd(count)}
            className="w-24 h-12 bg-zinc-900 border border-[#FFD700] text-[#FFD700] hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4 mr-1" /> {count}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}