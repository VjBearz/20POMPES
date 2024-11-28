import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkoutState, WorkoutSession } from './types';
import { v4 as uuidv4 } from 'uuid';

const calculateLevel = (xp: number) => Math.floor(xp / 100) + 1;

const initialState: WorkoutState = {
  sessions: [],
  stats: {
    totalPushups: 0,
    dailyStreak: 0,
    bestStreak: 0,
    level: 1,
    xp: 0,
    achievements: [],
  },
  settings: {
    dailyGoal: 20,
    setsPerDay: 3,
    pushUpsPerSet: 10,
    notificationTimes: ['09:00', '14:00', '19:00'],
  },
};

export const useWorkoutStore = create<
  WorkoutState & {
    addWorkout: (workout: Omit<WorkoutSession, 'id' | 'date'>) => void;
    updateStreak: () => void;
    getDailyProgress: () => number;
    getWeeklyProgress: () => { day: string; count: number }[];
    resetDailyProgress: () => void;
  }
>()(
  persist(
    (set, get) => ({
      ...initialState,

      addWorkout: (workout) => {
        const session: WorkoutSession = {
          id: uuidv4(),
          date: new Date().toISOString(),
          ...workout,
        };

        set((state) => {
          const newXP = state.stats.xp + workout.pushups;
          const newLevel = calculateLevel(newXP);
          const newTotalPushups = state.stats.totalPushups + workout.pushups;

          return {
            sessions: [...state.sessions, session],
            stats: {
              ...state.stats,
              totalPushups: newTotalPushups,
              xp: newXP,
              level: newLevel,
            },
          };
        });

        get().updateStreak();
      },

      updateStreak: () => {
        const today = new Date().setHours(0, 0, 0, 0);
        const sessions = get().sessions;
        
        if (sessions.length === 0) return;

        const lastSession = new Date(sessions[sessions.length - 1].date);
        const lastSessionDay = lastSession.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today - lastSessionDay) / (1000 * 60 * 60 * 24));

        set((state) => {
          const newStreak = diffDays <= 1 ? state.stats.dailyStreak + 1 : 1;
          const newBestStreak = Math.max(state.stats.bestStreak, newStreak);

          return {
            stats: {
              ...state.stats,
              dailyStreak: newStreak,
              bestStreak: newBestStreak,
            },
          };
        });
      },

      getDailyProgress: () => {
        const today = new Date().setHours(0, 0, 0, 0);
        return get().sessions
          .filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate.setHours(0, 0, 0, 0) === today;
          })
          .reduce((sum, session) => sum + session.pushups, 0);
      },

      getWeeklyProgress: () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        
        return days.map((day, index) => {
          const date = new Date(weekStart);
          date.setDate(date.getDate() + index);
          const dayTotal = get().sessions
            .filter((session) => {
              const sessionDate = new Date(session.date);
              return sessionDate.toDateString() === date.toDateString();
            })
            .reduce((sum, session) => sum + session.pushups, 0);

          return { day, count: dayTotal };
        });
      },

      resetDailyProgress: () => {
        const today = new Date().setHours(0, 0, 0, 0);
        set((state) => ({
          sessions: state.sessions.filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate.setHours(0, 0, 0, 0) !== today;
          }),
        }));
      },
    }),
    {
      name: 'workout-storage',
      version: 1,
    }
  )
);