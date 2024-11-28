export interface Notification {
  id: string;
  type: 'reminder' | 'achievement' | 'progress' | 'weekly';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  dailyReminders: boolean;
  weeklyReport: boolean;
  achievements: boolean;
  reminderTimes: string[];
  sound: boolean;
}