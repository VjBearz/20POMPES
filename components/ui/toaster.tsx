"use client";

import { useToast } from "./use-toast";
import { Toast } from "./toast";
import { AnimatePresence } from "framer-motion";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            action={toast.action}
            onDismiss={() => dismiss(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}