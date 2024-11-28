import { useNotificationStore } from './store';
import { useWorkoutStore } from '@/lib/storage/store';

export function useNotificationService() {
  const { addNotification, preferences } = useNotificationStore();
  const { getDailyProgress } = useWorkoutStore();

  const scheduleReminders = () => {
    if (!preferences.enabled || !preferences.dailyReminders) return;

    preferences.reminderTimes.forEach((time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const now = new Date();
      const reminderTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );

      if (reminderTime > now) {
        const delay = reminderTime.getTime() - now.getTime();
        setTimeout(() => {
          const progress = getDailyProgress();
          const dailyGoal = 20; // Get from settings in real app
          const remaining = dailyGoal - progress;

          if (remaining > 0) {
            addNotification({
              type: 'reminder',
              title: 'Time for Push-ups!',
              message: `You still need ${remaining} push-ups to reach your daily goal.`,
            });
          }
        }, delay);
      }
    });
  };

  const sendWeeklyReport = (
    totalPushups: number,
    daysCompleted: number,
    improvement: number
  ) => {
    if (!preferences.enabled || !preferences.weeklyReport) return;

    addNotification({
      type: 'weekly',
      title: 'Weekly Progress Report',
      message: `Great work! You completed ${totalPushups} push-ups across ${daysCompleted} days, a ${improvement}% improvement from last week.`,
    });
  };

  const sendAchievementNotification = (achievement: string) => {
    if (!preferences.enabled || !preferences.achievements) return;

    addNotification({
      type: 'achievement',
      title: 'New Achievement!',
      message: `Congratulations! You've earned the "${achievement}" badge!`,
    });
  };

  return {
    scheduleReminders,
    sendWeeklyReport,
    sendAchievementNotification,
  };
}