/**
 * Difficulty Adapter Utility
 * Feature #8: Personalized Sound Trouble Tracking
 *
 * Adapts difficulty level based on student performance
 * Helps maintain optimal challenge level (not too easy, not too hard)
 */

/**
 * Calculate recommended difficulty level based on accuracy
 *
 * @param {number} accuracy - Accuracy percentage (0-1)
 * @param {number} totalAttempts - Total number of attempts
 * @returns {string} - 'easy', 'medium', 'hard'
 */
export const calculateDifficulty = (accuracy, totalAttempts) => {
  // Need at least 3 attempts to make a judgment
  if (totalAttempts < 3) {
    return 'medium'; // Start at medium
  }

  // High accuracy (>= 80%) = too easy, increase difficulty
  if (accuracy >= 0.8) {
    return 'hard';
  }

  // Good accuracy (60-80%) = appropriate difficulty
  if (accuracy >= 0.6) {
    return 'medium';
  }

  // Low accuracy (< 60%) = too hard, decrease difficulty
  return 'easy';
};

/**
 * Recommend speech rate based on performance
 * Used in MinimalPairs and other modes
 *
 * @param {number} accuracy - Accuracy percentage (0-1)
 * @param {number} totalAttempts - Total number of attempts
 * @returns {object} - { rate, mode, reason }
 */
export const recommendSpeechRate = (accuracy, totalAttempts) => {
  if (totalAttempts < 3) {
    return {
      rate: 0.7,
      mode: 'normal',
      reason: 'Starting with normal speed'
    };
  }

  if (accuracy < 0.5) {
    return {
      rate: 0.4,
      mode: 'exaggerated',
      reason: 'Slowing down to help distinguish sounds'
    };
  }

  if (accuracy >= 0.8) {
    return {
      rate: 0.8,
      mode: 'normal',
      reason: 'Great progress! Trying normal speed'
    };
  }

  return {
    rate: 0.7,
    mode: 'normal',
    reason: 'Maintaining steady pace'
  };
};

/**
 * Should add background noise based on performance?
 *
 * @param {number} accuracy - Accuracy percentage (0-1)
 * @param {number} totalAttempts - Total number of attempts
 * @returns {boolean}
 */
export const shouldAddNoise = (accuracy, totalAttempts) => {
  // Only add noise if student is doing well (>= 80%) and has enough practice (>= 10 attempts)
  return totalAttempts >= 10 && accuracy >= 0.8;
};

/**
 * Get next practice item based on performance
 * Balances between problem areas and mastered areas
 *
 * @param {array} problemItems - Items student struggles with
 * @param {array} masteredItems - Items student has mastered
 * @param {array} newItems - Items not yet attempted
 * @returns {object} - { item, reason, focusArea }
 */
export const getNextPracticeItem = (problemItems = [], masteredItems = [], newItems = []) => {
  // 70% focus on problem areas, 20% new items, 10% review mastered
  const random = Math.random();

  if (random < 0.7 && problemItems.length > 0) {
    // Focus on weakest area
    return {
      item: problemItems[0], // Already sorted worst-first
      reason: 'Focusing on challenging area',
      focusArea: 'problem'
    };
  }

  if (random < 0.9 && newItems.length > 0) {
    // Introduce new content
    const randomIndex = Math.floor(Math.random() * newItems.length);
    return {
      item: newItems[randomIndex],
      reason: 'Trying something new',
      focusArea: 'new'
    };
  }

  if (masteredItems.length > 0) {
    // Review mastered content (builds confidence)
    const randomIndex = Math.floor(Math.random() * masteredItems.length);
    return {
      item: masteredItems[randomIndex],
      reason: 'Quick review',
      focusArea: 'mastered'
    };
  }

  // Fallback: random new item
  if (newItems.length > 0) {
    const randomIndex = Math.floor(Math.random() * newItems.length);
    return {
      item: newItems[randomIndex],
      reason: 'Starting fresh',
      focusArea: 'new'
    };
  }

  return null;
};

/**
 * Calculate streak bonus based on consecutive correct answers
 *
 * @param {number} streak - Current streak count
 * @returns {number} - Bonus points
 */
export const calculateStreakBonus = (streak) => {
  if (streak < 3) return 0;
  if (streak < 5) return 5;
  if (streak < 10) return 10;
  return 20; // Mega streak!
};

/**
 * Determine if student should take a break
 * Based on session length and accuracy trend
 *
 * @param {number} sessionDuration - Minutes in current session
 * @param {number} recentAccuracy - Accuracy in last 5 attempts
 * @returns {object} - { shouldBreak, reason }
 */
export const shouldTakeBreak = (sessionDuration, recentAccuracy) => {
  // Long session (> 20 minutes)
  if (sessionDuration > 20) {
    return {
      shouldBreak: true,
      reason: 'Great work! Time for a quick break.'
    };
  }

  // Accuracy dropping (< 40% in recent attempts) suggests fatigue
  if (recentAccuracy < 0.4) {
    return {
      shouldBreak: true,
      reason: 'Let\'s take a break and come back fresh.'
    };
  }

  return {
    shouldBreak: false,
    reason: null
  };
};

/**
 * Get appropriate feedback intensity based on attempt number
 * More hints and support after multiple failures
 *
 * @param {number} attempts - Number of attempts on current item
 * @param {boolean} isCorrect - Whether current attempt was correct
 * @returns {object} - { showHint, showComparison, showTip, encouragementLevel }
 */
export const getFeedbackIntensity = (attempts, isCorrect) => {
  if (isCorrect) {
    return {
      showHint: false,
      showComparison: false,
      showTip: false,
      encouragementLevel: 'celebrate'
    };
  }

  // First attempt: minimal help
  if (attempts === 1) {
    return {
      showHint: false,
      showComparison: false,
      showTip: false,
      encouragementLevel: 'gentle'
    };
  }

  // Second attempt: show comparison
  if (attempts === 2) {
    return {
      showHint: true,
      showComparison: true,
      showTip: false,
      encouragementLevel: 'supportive'
    };
  }

  // Third+ attempt: full support
  return {
    showHint: true,
    showComparison: true,
    showTip: true,
    encouragementLevel: 'strong'
  };
};
