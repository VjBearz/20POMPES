export interface WorkoutSession {
  id: string;
  date: string;
  pushups: number;
  type: 'regular' | 'challenge' | 'guided';
  duration?: number;
  variation?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  earnedDate: string;
  icon: string;
}

export interface UserStats {
  totalPushups: number;
  dailyStreak: number;
  bestStreak: number;
  level: number;
  xp: number;
  achievements: Achievement[];
}

export interface WorkoutState {
  sessions: WorkoutSession[];
  stats: UserStats;
  settings: {
    dailyGoal: number;
    setsPerDay: number;
    pushUpsPerSet: number;
    notificationTimes: string[];
  };
}