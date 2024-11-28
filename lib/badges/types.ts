export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: {
    type: 'pushups' | 'streak' | 'challenge' | 'record';
    value: number;
  };
  earnedDate?: string;
  progress?: number;
}

export interface BadgeProgress {
  earned: boolean;
  progress: number;
  total: number;
}