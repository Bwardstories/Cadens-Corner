/**
 * Feedback Generator Utility
 * Feature #7: Error-Friendly Feedback
 *
 * Generates age-appropriate, supportive feedback messages
 * NO harsh "wrong" language - always encouraging
 */

import { feedbackMessages, getRandomMessage, getStreakMessage } from '../data/feedbackMessages';

/**
 * Generate feedback based on answer correctness and context
 *
 * @param {boolean} isCorrect - Whether the answer was correct
 * @param {object} context - Context information
 * @param {string} context.mode - The current mode (e.g., 'minimal_pairs', 'word_structure')
 * @param {string} context.difficultySound - The sound pair being practiced (e.g., '/θ/ vs /f/')
 * @param {number} context.streak - Current streak count
 * @param {number} context.attempts - Number of attempts on this question
 * @param {array} context.pair - The word pair [word1, word2]
 *
 * @returns {object} Feedback object with message, tone, color, suggestion, etc.
 */
export const generateFeedback = (isCorrect, context = {}) => {
  const {
    difficultySound = null,
    streak = 0,
    attempts = 1
  } = context;

  if (isCorrect) {
    return generateCorrectFeedback(streak);
  } else {
    return generateIncorrectFeedback(difficultySound, attempts);
  }
};

/**
 * Generate feedback for correct answers
 */
const generateCorrectFeedback = (streak) => {
  // Check for streak message
  const streakMessage = getStreakMessage(streak);

  const message = streakMessage || getRandomMessage(feedbackMessages.correct.general);

  return {
    type: 'correct',
    message,
    tone: 'encouraging',
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    icon: 'check',
    showReplay: false,
    showHint: false
  };
};

/**
 * Generate feedback for incorrect answers
 */
const generateIncorrectFeedback = (difficultySound, attempts) => {
  let message = getRandomMessage(feedbackMessages.incorrect.general);
  let suggestion = null;
  let tip = null;

  // Check for specific sound pair feedback
  if (difficultySound && feedbackMessages.incorrect.specific[difficultySound]) {
    const specificFeedback = feedbackMessages.incorrect.specific[difficultySound];

    // Use specific message on first attempt
    if (attempts === 1) {
      message = specificFeedback.message;
    }

    // Show tip after 2+ attempts
    if (attempts >= 2) {
      tip = specificFeedback.tip;
    }
  }

  // Add encouragement after multiple attempts
  if (attempts >= 3) {
    suggestion = getRandomMessage(feedbackMessages.encouragement);
  }

  return {
    type: 'incorrect',
    message,
    tone: 'supportive',
    color: 'blue', // NOT red! Blue is calmer and supportive
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    icon: 'info',
    showReplay: true,
    showHint: attempts >= 2,
    suggestion,
    tip,
    attempts
  };
};

/**
 * Get hint based on attempt number
 */
export const getHint = (attempts) => {
  if (attempts < 2) return null;

  if (attempts === 2) {
    return getRandomMessage(feedbackMessages.hints.level1);
  } else if (attempts === 3) {
    return getRandomMessage(feedbackMessages.hints.level2);
  } else {
    return getRandomMessage(feedbackMessages.hints.level3);
  }
};

/**
 * Get encouragement message
 */
export const getEncouragement = () => {
  return getRandomMessage(feedbackMessages.encouragement);
};
