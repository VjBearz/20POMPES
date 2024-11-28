"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Calendar, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useWorkoutStore } from "@/lib/storage/store";

export function PersonalRecords() {
  const sessions = useWorkoutStore((state) => state.sessions);
  
  // Calculate records
  const dailyRecord = sessions.reduce((max, session) => {
    const date = new Date(session.date).toDateString();
    const dailyTotal = sessions
      .filter(s => new Date(s.date).toDateString() === date)
      .reduce((sum, s) => sum + s.pushups, 0);
    return Math.max(max, dailyTotal);
  }, 0);

  const weeklyRecord = sessions.reduce((max, session) => {
    const date = new Date(session.date);
    const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
    const weeklyTotal = sessions
      .filter(s => {
        const sDate = new Date(s.date);
        const sWeekStart = new Date(sDate.setDate(sDate.getDate() - sDate.getDay()));
        return sWeekStart.getTime() === weekStart.getTime();
      })
      .reduce((sum, s) => sum + s.pushups, 0);
    return Math.max(max, weeklyTotal);
  }, 0);

  const singleSessionRecord = Math.max(...sessions.map(s => s.pushups));

  const records = [
    {
      title: "Daily Record",
      value: dailyRecord,
      icon: Trophy,
      color: "text-[#FFD700]",
    },
    {
      title: "Weekly Record",
      value: weeklyRecord,
      icon: Calendar,
      color: "text-green-500",
    },
    {
      title: "Single Session",
      value: singleSessionRecord,
      icon: Zap,
      color: "text-blue-500",
    },
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-[#FFD700]" />
          Personal Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {records.map((record) => (
            <motion.div
              key={record.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-zinc-800"
            >
              <div className="flex items-center gap-3">
                <record.icon className={`h-5 w-5 ${record.color}`} />
                <div>
                  <p className="text-sm text-zinc-400">{record.title}</p>
                  <p className="text-2xl font-bold">{record.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}