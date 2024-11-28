import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkoutState {
  pushups: number;
  history: Array<{
    date: string;
    count: number;
    type: string;
  }>;
  streak: number;
  level: number;
  xp: number;
  addPushups: (count: number, type?: string) => void;
  updateStreak: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      pushups: 0,
      history: [],
      streak: 0,
      level: 1,
      xp: 0,
      addPushups: (count, type = "regular") => {
        const currentXP = get().xp + count;
        const newLevel = Math.floor(currentXP / 100) + 1;
        
        set((state) => ({
          pushups: state.pushups + count,
          history: [
            ...state.history,
            {
              date: new Date().toISOString(),
              count,
              type,
            },
          ],
          xp: currentXP,
          level: newLevel,
        }));
      },
      updateStreak: () => {
        const lastWorkout = get().history[get().history.length - 1];
        if (!lastWorkout) return;

        const lastWorkoutDate = new Date(lastWorkout.date);
        const today = new Date();
        const diffDays = Math.floor(
          (today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        set((state) => ({
          streak: diffDays <= 1 ? state.streak + 1 : 0,
        }));
      },
    }),
    {
      name: "workout-storage",
    }
  )
);