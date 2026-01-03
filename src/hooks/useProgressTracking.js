import { useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';

/**
 * useProgressTracking Hook
 * Feature #8: Personalized Sound Trouble Tracking
 *
 * Convenience hook for components to track student progress
 * Provides simple interface for recording attempts and getting recommendations
 */
export const useProgressTracking = () => {
  const {
    recordSoundAttempt,
    recordPairAttempt,
    recordWordAttempt,
    recordSession,
    getProblemSounds,
    getProblemPairs,
    getMasteredSounds,
    getOverallStats,
    getSoundAccuracy,
    getPairAccuracy
  } = useProgress();

  /**
   * Track an attempt in any mode
   * Automatically determines what to track based on context
   */
  const trackAttempt = useCallback((type, item, isCorrect, metadata = {}) => {
    switch (type) {
      case 'sound':
        recordSoundAttempt(item, isCorrect, metadata);
        break;
      case 'pair':
        recordPairAttempt(item, isCorrect, metadata);
        break;
      case 'word':
        recordWordAttempt(item, isCorrect, metadata);
        break;
      default:
        console.warn(`Unknown tracking type: ${type}`);
    }
  }, [recordSoundAttempt, recordPairAttempt, recordWordAttempt]);

  /**
   * Get recommended practice items based on performance
   * Returns items the student should focus on
   */
  const getRecommendations = useCallback(() => {
    const problemSounds = getProblemSounds();
    const problemPairs = getProblemPairs();

    return {
      sounds: problemSounds.slice(0, 5), // Top 5 problem sounds
      pairs: problemPairs.slice(0, 5), // Top 5 problem pairs
      hasProblemAreas: problemSounds.length > 0 || problemPairs.length > 0
    };
  }, [getProblemSounds, getProblemPairs]);

  /**
   * Get difficulty level for a specific sound based on accuracy
   * Returns: 'easy', 'medium', 'hard'
   */
  const getSoundDifficulty = useCallback((sound) => {
    const stats = getSoundAccuracy(sound);

    if (!stats || stats.total < 3) {
      return 'medium'; // Default for new sounds
    }

    if (stats.accuracy >= 0.8) return 'easy';
    if (stats.accuracy >= 0.6) return 'medium';
    return 'hard';
  }, [getSoundAccuracy]);

  /**
   * Get difficulty level for a pair based on accuracy
   */
  const getPairDifficulty = useCallback((pair) => {
    const stats = getPairAccuracy(pair);

    if (!stats || stats.total < 3) {
      return 'medium';
    }

    if (stats.accuracy >= 0.8) return 'easy';
    if (stats.accuracy >= 0.6) return 'medium';
    return 'hard';
  }, [getPairAccuracy]);

  /**
   * Should show encouragement?
   * Returns true if student is struggling and needs support
   */
  const shouldEncourage = useCallback((itemType, item) => {
    let accuracy = null;

    if (itemType === 'sound') {
      const stats = getSoundAccuracy(item);
      accuracy = stats?.accuracy;
    } else if (itemType === 'pair') {
      const stats = getPairAccuracy(item);
      accuracy = stats?.accuracy;
    }

    // Show encouragement if struggling (< 50% accuracy) after 3+ attempts
    return accuracy !== null && accuracy < 0.5;
  }, [getSoundAccuracy, getPairAccuracy]);

  /**
   * Get progress summary for display
   */
  const getProgressSummary = useCallback(() => {
    const stats = getOverallStats();
    const recommendations = getRecommendations();
    const mastered = getMasteredSounds();

    return {
      ...stats,
      recommendations,
      recentMastery: mastered.slice(0, 3) // Recently mastered sounds
    };
  }, [getOverallStats, getRecommendations, getMasteredSounds]);

  return {
    // Core tracking
    trackAttempt,
    recordSession,

    // Queries
    getRecommendations,
    getSoundDifficulty,
    getPairDifficulty,
    shouldEncourage,
    getProgressSummary,

    // Direct access to context methods
    getProblemSounds,
    getProblemPairs,
    getMasteredSounds,
    getOverallStats,
    getSoundAccuracy,
    getPairAccuracy
  };
};
