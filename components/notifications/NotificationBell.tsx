"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotificationStore } from "@/lib/notifications/store";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export function NotificationBell() {
  const { notifications, markAsRead } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-zinc-800"
        >
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#FFD700] text-black text-xs flex items-center justify-center"
              >
                {unreadCount}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-zinc-900 border-zinc-800"
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex flex-col items-start p-4 space-y-1 cursor-pointer ${
                !notification.read ? "bg-zinc-800/50" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-zinc-400">
                  {format(new Date(notification.timestamp), "HH:mm")}
                </span>
              </div>
              <p className="text-sm text-zinc-400">{notification.message}</p>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-zinc-400">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}