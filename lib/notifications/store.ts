import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification, NotificationPreferences } from './types';
import { v4 as uuidv4 } from 'uuid';

interface NotificationState {
  notifications: Notification[];
  preferences: NotificationPreferences;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
}

const defaultPreferences: NotificationPreferences = {
  enabled: true,
  dailyReminders: true,
  weeklyReport: true,
  achievements: true,
  reminderTimes: ['09:00', '14:00', '19:00'],
  sound: true,
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      preferences: defaultPreferences,

      addNotification: (notification) => {
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: uuidv4(),
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        }));
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          ),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      updatePreferences: (preferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        }));
      },
    }),
    {
      name: 'notification-storage',
    }
  )
);