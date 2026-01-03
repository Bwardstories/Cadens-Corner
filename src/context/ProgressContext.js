import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * ProgressContext
 * Feature #8: Personalized Sound Trouble Tracking
 *
 * Tracks student performance across all modes:
 * - Which sounds/pairs they've practiced
 * - Accuracy for each sound
 * - Problem areas (sounds they struggle with)
 * - Adaptive difficulty recommendations
 */

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  // Persistent storage for progress data
  const [progressData, setProgressData] = useLocalStorage('cadens-corner-progress', {
    soundAccuracy: {}, // { '/θ/': { correct: 5, total: 10, lastAttempt: timestamp }, ... }
    pairAccuracy: {}, // { 'thirteen-fourteen': { correct: 3, total: 8, lastAttempt: timestamp }, ... }
    wordAccuracy: {}, // { 'thirteen': { correct: 7, total: 12, lastAttempt: timestamp }, ... }
    sessionHistory: [], // Array of session objects with timestamp, mode, score
    totalAttempts: 0,
    totalCorrect: 0,
    startDate: Date.now()
  });

  /**
   * Record an attempt for a sound
   */
  const recordSoundAttempt = useCallback((sound, isCorrect, metadata = {}) => {
    setProgressData(prev => {
      const soundStats = prev.soundAccuracy[sound] || { correct: 0, total: 0, lastAttempt: null };

      return {
        ...prev,
        soundAccuracy: {
          ...prev.soundAccuracy,
          [sound]: {
            correct: soundStats.correct + (isCorrect ? 1 : 0),
            total: soundStats.total + 1,
            lastAttempt: Date.now(),
            ...metadata
          }
        },
        totalAttempts: prev.totalAttempts + 1,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0)
      };
    });
  }, [setProgressData]);

  /**
   * Record an attempt for a word pair
   */
  const recordPairAttempt = useCallback((pair, isCorrect, metadata = {}) => {
    const pairKey = Array.isArray(pair) ? pair.join('-') : pair;

    setProgressData(prev => {
      const pairStats = prev.pairAccuracy[pairKey] || { correct: 0, total: 0, lastAttempt: null };

      return {
        ...prev,
        pairAccuracy: {
          ...prev.pairAccuracy,
          [pairKey]: {
            correct: pairStats.correct + (isCorrect ? 1 : 0),
            total: pairStats.total + 1,
            lastAttempt: Date.now(),
            ...metadata
          }
        },
        totalAttempts: prev.totalAttempts + 1,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0)
      };
    });
  }, [setProgressData]);

  /**
   * Record an attempt for a word
   */
  const recordWordAttempt = useCallback((word, isCorrect, metadata = {}) => {
    setProgressData(prev => {
      const wordStats = prev.wordAccuracy[word] || { correct: 0, total: 0, lastAttempt: null };

      return {
        ...prev,
        wordAccuracy: {
          ...prev.wordAccuracy,
          [word]: {
            correct: wordStats.correct + (isCorrect ? 1 : 0),
            total: wordStats.total + 1,
            lastAttempt: Date.now(),
            ...metadata
          }
        },
        totalAttempts: prev.totalAttempts + 1,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0)
      };
    });
  }, [setProgressData]);

  /**
   * Record a session (when user completes a practice session in a mode)
   */
  const recordSession = useCallback((mode, stats = {}) => {
    setProgressData(prev => ({
      ...prev,
      sessionHistory: [
        ...prev.sessionHistory,
        {
          mode,
          timestamp: Date.now(),
          ...stats
        }
      ]
    }));
  }, [setProgressData]);

  /**
   * Get problem sounds (accuracy < 60%)
   */
  const getProblemSounds = useCallback(() => {
    const threshold = 0.6; // 60% accuracy threshold

    return Object.entries(progressData.soundAccuracy)
      .filter(([sound, stats]) => {
        const accuracy = stats.total > 0 ? stats.correct / stats.total : 0;
        return stats.total >= 3 && accuracy < threshold; // At least 3 attempts
      })
      .map(([sound, stats]) => ({
        sound,
        accuracy: stats.correct / stats.total,
        attempts: stats.total,
        ...stats
      }))
      .sort((a, b) => a.accuracy - b.accuracy); // Worst first
  }, [progressData.soundAccuracy]);

  /**
   * Get problem pairs (accuracy < 60%)
   */
  const getProblemPairs = useCallback(() => {
    const threshold = 0.6;

    return Object.entries(progressData.pairAccuracy)
      .filter(([pair, stats]) => {
        const accuracy = stats.total > 0 ? stats.correct / stats.total : 0;
        return stats.total >= 3 && accuracy < threshold;
      })
      .map(([pair, stats]) => ({
        pair: pair.split('-'),
        pairKey: pair,
        accuracy: stats.correct / stats.total,
        attempts: stats.total,
        ...stats
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [progressData.pairAccuracy]);

  /**
   * Get mastered sounds (accuracy >= 80%, at least 5 attempts)
   */
  const getMasteredSounds = useCallback(() => {
    const threshold = 0.8;

    return Object.entries(progressData.soundAccuracy)
      .filter(([sound, stats]) => {
        const accuracy = stats.total > 0 ? stats.correct / stats.total : 0;
        return stats.total >= 5 && accuracy >= threshold;
      })
      .map(([sound, stats]) => ({
        sound,
        accuracy: stats.correct / stats.total,
        attempts: stats.total,
        ...stats
      }))
      .sort((a, b) => b.accuracy - a.accuracy); // Best first
  }, [progressData.soundAccuracy]);

  /**
   * Get overall statistics
   */
  const getOverallStats = useCallback(() => {
    const totalAccuracy = progressData.totalAttempts > 0
      ? progressData.totalCorrect / progressData.totalAttempts
      : 0;

    const soundsPracticed = Object.keys(progressData.soundAccuracy).length;
    const pairsPracticed = Object.keys(progressData.pairAccuracy).length;
    const wordsPracticed = Object.keys(progressData.wordAccuracy).length;

    const daysActive = Math.ceil((Date.now() - progressData.startDate) / (1000 * 60 * 60 * 24));

    return {
      totalAccuracy,
      totalAttempts: progressData.totalAttempts,
      totalCorrect: progressData.totalCorrect,
      soundsPracticed,
      pairsPracticed,
      wordsPracticed,
      sessionsCompleted: progressData.sessionHistory.length,
      daysActive,
      masteredSounds: getMasteredSounds().length,
      problemSounds: getProblemSounds().length
    };
  }, [progressData, getMasteredSounds, getProblemSounds]);

  /**
   * Get sound accuracy
   */
  const getSoundAccuracy = useCallback((sound) => {
    const stats = progressData.soundAccuracy[sound];
    if (!stats || stats.total === 0) return null;

    return {
      accuracy: stats.correct / stats.total,
      ...stats
    };
  }, [progressData.soundAccuracy]);

  /**
   * Get pair accuracy
   */
  const getPairAccuracy = useCallback((pair) => {
    const pairKey = Array.isArray(pair) ? pair.join('-') : pair;
    const stats = progressData.pairAccuracy[pairKey];
    if (!stats || stats.total === 0) return null;

    return {
      accuracy: stats.correct / stats.total,
      ...stats
    };
  }, [progressData.pairAccuracy]);

  /**
   * Reset all progress (for testing or fresh start)
   */
  const resetProgress = useCallback(() => {
    setProgressData({
      soundAccuracy: {},
      pairAccuracy: {},
      wordAccuracy: {},
      sessionHistory: [],
      totalAttempts: 0,
      totalCorrect: 0,
      startDate: Date.now()
    });
  }, [setProgressData]);

  const value = {
    // Data
    progressData,

    // Recording functions
    recordSoundAttempt,
    recordPairAttempt,
    recordWordAttempt,
    recordSession,

    // Query functions
    getProblemSounds,
    getProblemPairs,
    getMasteredSounds,
    getOverallStats,
    getSoundAccuracy,
    getPairAccuracy,

    // Utility
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
