import { useState, useCallback } from "react";

interface ToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

interface Toast extends ToastOptions {
  id: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({ title, description, action, duration = 5000 }: ToastOptions) => {
      const id = Math.random().toString(36).slice(2);
      const newToast: Toast = {
        id,
        title,
        description,
        action,
        duration,
      };

      setToasts((currentToasts) => [...currentToasts, newToast]);

      setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((toast) => toast.id !== id)
        );
      }, duration);
    },
    []
  );

  return {
    toast,
    toasts,
    dismiss: (id: string) =>
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      ),
  };
}