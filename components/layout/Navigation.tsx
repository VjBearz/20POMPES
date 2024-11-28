"use client";

import { Home, BarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { QuickAddButtons } from "@/components/quick-actions/QuickAddButtons";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Statistics", href: "/statistics", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface NavigationProps {
  onAdd?: (count: number) => void;
  onUndo?: () => void;
}

export function Navigation({ onAdd, onUndo }: NavigationProps) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0">
      {onAdd && <QuickAddButtons onAdd={onAdd} onUndo={onUndo} />}
      <nav className="bg-black border-t border-zinc-800">
        <div className="flex items-center justify-around p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center p-2 text-sm transition-colors hover:text-[#FFD700]",
                  pathname === item.href ? "text-[#FFD700]" : "text-zinc-400"
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="mt-1 text-xs">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}