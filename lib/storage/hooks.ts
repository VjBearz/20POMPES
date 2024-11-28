import { useEffect } from 'react';
import { useWorkoutStore } from './store';

export function useAutoResetProgress() {
  const resetDailyProgress = useWorkoutStore((state) => state.resetDailyProgress);

  useEffect(() => {
    const checkDate = () => {
      const lastResetDate = localStorage.getItem('lastResetDate');
      const today = new Date().toDateString();

      if (lastResetDate !== today) {
        resetDailyProgress();
        localStorage.setItem('lastResetDate', today);
      }
    };

    checkDate();
    const interval = setInterval(checkDate, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [resetDailyProgress]);
}

export function useWorkoutProgress() {
  const dailyProgress = useWorkoutStore((state) => state.getDailyProgress());
  const weeklyProgress = useWorkoutStore((state) => state.getWeeklyProgress());
  const stats = useWorkoutStore((state) => state.stats);
  const settings = useWorkoutStore((state) => state.settings);

  return {
    dailyProgress,
    weeklyProgress,
    stats,
    settings,
    dailyGoalProgress: (dailyProgress / settings.dailyGoal) * 100,
    weeklyGoal: settings.dailyGoal * 7,
    weeklyTotal: weeklyProgress.reduce((sum, day) => sum + day.count, 0),
  };
}