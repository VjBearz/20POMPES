"use client";

import { createContext, useContext } from "react";
import { useToast } from "@/components/ui/use-toast";
import '../lib/i18n';

const ToastContext = createContext<ReturnType<typeof useToast> | undefined>(
  undefined
);

export function Providers({ children }: { children: React.ReactNode }) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
  );
}

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};