"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RoutineSettings() {
  const { toast } = useToast();
  const [sets, setSets] = useState("3");
  const [repsPerSet, setRepsPerSet] = useState("10");
  const [notificationTime, setNotificationTime] = useState("09:00");
  const [notificationType, setNotificationType] = useState("automatic");

  const handleSave = () => {
    toast({
      title: "Routine settings saved",
      description: "Your workout routine has been updated.",
    });
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-[#FFD700]" />
          Workout Routine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sets per Day</label>
            <Input
              type="number"
              min="1"
              max="10"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Push-ups per Set</label>
            <Input
              type="number"
              min="1"
              max="50"
              value={repsPerSet}
              onChange={(e) => setRepsPerSet(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notification Schedule</label>
            <Select
              value={notificationType}
              onValueChange={setNotificationType}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select schedule type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automatic">Automatic (Evenly Spaced)</SelectItem>
                <SelectItem value="manual">Manual Times</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {notificationType === "manual" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">First Notification Time</label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#FFD700]" />
                <Input
                  type="time"
                  value={notificationTime}
                  onChange={(e) => setNotificationTime(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
          )}
        </div>

        <Button 
          onClick={handleSave}
          className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C]"
        >
          Save Routine
        </Button>
      </CardContent>
    </Card>
  );
}