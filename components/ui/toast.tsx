"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss: () => void;
}

export function Toast({ title, description, action, onDismiss }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-zinc-800 bg-zinc-900 p-6 pr-8 shadow-lg",
        "group"
      )}
    >
      <div className="flex-1">
        <h3 className="font-medium text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-zinc-400">{description}</p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium text-[#FFD700] hover:text-[#FFE55C] focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={onDismiss}
        className="absolute right-2 top-2 rounded-md p-1 text-zinc-400 hover:text-zinc-200"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}