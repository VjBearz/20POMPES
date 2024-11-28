import { v4 as uuidv4 } from 'uuid';

export interface MotivationalMessage {
  id: string;
  text: string;
  type: 'achievement' | 'progress' | 'streak' | 'challenge';
}

const achievementMessages = [
  "Outstanding work! You're getting stronger every day! 💪",
  "You're crushing it! Keep pushing your limits! 🚀",
  "Amazing progress! You're becoming unstoppable! ⭐",
  "Incredible effort! You're building a better you! 🏆",
];

const progressMessages = [
  "Every push-up brings you closer to your goals! 🎯",
  "Small progress is still progress. Keep going! 🌱",
  "You're doing great! Stay consistent! 📈",
  "Building strength one push-up at a time! 💪",
];

const streakMessages = [
  "Your dedication is inspiring! Keep that streak alive! 🔥",
  "Consistency is key, and you're nailing it! ⚡",
  "Another day, another victory! You're on fire! 🌟",
  "Your commitment is paying off! Keep it up! 🎉",
];

const challengeMessages = [
  "Challenge completed! You're getting stronger! 🏋️‍♂️",
  "Way to push through! That was impressive! 🌟",
  "You conquered this challenge! What's next? 🎯",
  "Outstanding performance! You're unstoppable! 💪",
];

export function getRandomMessage(type: MotivationalMessage['type']): MotivationalMessage {
  let messages: string[];
  
  switch (type) {
    case 'achievement':
      messages = achievementMessages;
      break;
    case 'progress':
      messages = progressMessages;
      break;
    case 'streak':
      messages = streakMessages;
      break;
    case 'challenge':
      messages = challengeMessages;
      break;
  }

  const randomIndex = Math.floor(Math.random() * messages.length);
  
  return {
    id: uuidv4(),
    text: messages[randomIndex],
    type,
  };
}

export function getContextualMessage(
  pushupCount: number,
  dailyGoal: number,
  streak: number
): MotivationalMessage {
  if (pushupCount >= dailyGoal) {
    return getRandomMessage('achievement');
  }
  
  if (streak > 1) {
    return getRandomMessage('streak');
  }
  
  if (pushupCount > 0) {
    return getRandomMessage('progress');
  }
  
  return {
    id: uuidv4(),
    text: "Ready to start today's push-ups? Let's go! 💪",
    type: 'progress',
  };
}