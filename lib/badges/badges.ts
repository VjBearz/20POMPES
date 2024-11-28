import { Badge } from './types';

export const badges: Badge[] = [
  {
    id: 'weekly-warrior',
    name: 'Weekly Warrior',
    description: 'Complete 100 push-ups in a week',
    icon: 'Trophy',
    requirement: {
      type: 'pushups',
      value: 100,
    },
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: '3 consecutive days with 20+ push-ups',
    icon: 'Flame',
    requirement: {
      type: 'streak',
      value: 3,
    },
  },
  {
    id: 'challenge-champion',
    name: 'Challenge Champion',
    description: 'Complete your first challenge',
    icon: 'Award',
    requirement: {
      type: 'challenge',
      value: 1,
    },
  },
  {
    id: 'record-breaker',
    name: 'Record Breaker',
    description: 'Beat your personal best',
    icon: 'Star',
    requirement: {
      type: 'record',
      value: 1,
    },
  },
  {
    id: 'endurance-elite',
    name: 'Endurance Elite',
    description: 'Complete 30 push-ups in one set',
    icon: 'Zap',
    requirement: {
      type: 'pushups',
      value: 30,
    },
  },
];

export function calculateBadgeProgress(
  badge: Badge,
  stats: {
    weeklyPushups: number;
    currentStreak: number;
    challengesCompleted: number;
    personalBest: number;
    maxPushups: number;
  }
): BadgeProgress {
  let progress = 0;
  const total = badge.requirement.value;

  switch (badge.requirement.type) {
    case 'pushups':
      progress = badge.id === 'weekly-warrior' ? stats.weeklyPushups : stats.maxPushups;
      break;
    case 'streak':
      progress = stats.currentStreak;
      break;
    case 'challenge':
      progress = stats.challengesCompleted;
      break;
    case 'record':
      progress = stats.personalBest > 0 ? 1 : 0;
      break;
  }

  return {
    earned: progress >= total,
    progress,
    total,
  };
}