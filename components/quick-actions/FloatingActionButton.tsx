"use client";

import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FloatingActionButtonProps {
  onAdd: (count: number) => void;
  onUndo: () => void;
}

export function FloatingActionButton({ onAdd, onUndo }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleAdd = (count: number) => {
    onAdd(count);
    setIsOpen(false);
    toast({
      title: `Added ${count} push-ups!`,
      description: "Click to undo",
      action: {
        label: "Undo",
        onClick: onUndo,
      },
    });
  };

  const buttonVariants = {
    closed: { scale: 1, rotate: 0 },
    open: { scale: 1, rotate: 45 },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute bottom-16 right-0 flex flex-col gap-2 items-end mb-4"
          >
            {[1, 5, 10].map((count) => (
              <motion.div key={count} variants={itemVariants}>
                <Button
                  onClick={() => handleAdd(count)}
                  className="bg-[#FFD700] text-black hover:bg-[#FFE55C] shadow-lg"
                >
                  +{count}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={buttonVariants}
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-[#FFD700] text-black hover:bg-[#FFE55C] shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
}