"use client";

import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, Volume2, Moon, Target, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/settings/LanguageSelector";
import { RoutineSettings } from "@/components/settings/RoutineSettings";

export default function Settings() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dailyGoal, setDailyGoal] = useState("20");

  const handleSaveGoal = () => {
    // Handle saving the goal
  };

  return (
    <div className="container mx-auto p-4 space-y-6 pb-24">
      <h1 className="text-3xl font-bold mb-6">{t('settings.title')}</h1>
      
      <div className="space-y-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#FFD700]" />
              {t('settings.language')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageSelector />
          </CardContent>
        </Card>

        <RoutineSettings />

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>{t('settings.notifications')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#FFD700]" />
                <span>{t('settings.notifications')}</span>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>{t('settings.sound')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-[#FFD700]" />
                <span>{t('settings.sound')}</span>
              </div>
              <Switch
                checked={sound}
                onCheckedChange={setSound}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>{t('settings.theme')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-[#FFD700]" />
                <span>{t('settings.darkMode')}</span>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>{t('settings.goals')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#FFD700]" />
                <span>{t('settings.dailyGoal')}</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
                <Button onClick={handleSaveGoal}>{t('settings.save')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}