import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Firestore Service
 * Handles all database operations for user settings and progress
 *
 * Collections structure:
 * - users/{userId}/settings - User settings (speech rate, theme, etc.)
 * - users/{userId}/progress - Progress tracking data
 */

/**
 * Get user settings from Firestore
 * @param {string} userId - The user's Firebase Auth UID
 * @returns {object} Settings object or default settings
 */
export const getUserSettings = async (userId) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'data', 'settings');
    const settingsSnap = await getDoc(settingsRef);

    if (settingsSnap.exists()) {
      return settingsSnap.data();
    }

    // Return default settings if none exist
    return {
      speechRate: 0.7,
      noiseLevel: 'none',
      theme: 'light',
      voiceGender: 'neutral',
      createdAt: Date.now()
    };
  } catch (error) {
    console.error('Error getting user settings:', error);
    throw error;
  }
};

/**
 * Save user settings to Firestore
 * @param {string} userId - The user's Firebase Auth UID
 * @param {object} settings - Settings object to save
 */
export const saveUserSettings = async (userId, settings) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'data', 'settings');
    await setDoc(settingsRef, {
      ...settings,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user settings:', error);
    throw error;
  }
};

/**
 * Get user progress data from Firestore
 * @param {string} userId - The user's Firebase Auth UID
 * @returns {object} Progress data or default structure
 */
export const getUserProgress = async (userId) => {
  try {
    const progressRef = doc(db, 'users', userId, 'data', 'progress');
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      return progressSnap.data();
    }

    // Return default progress structure if none exists
    return {
      soundAccuracy: {},
      pairAccuracy: {},
      wordAccuracy: {},
      sessionHistory: [],
      totalAttempts: 0,
      totalCorrect: 0,
      startDate: Date.now(),
      createdAt: Date.now()
    };
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
};

/**
 * Save user progress to Firestore
 * @param {string} userId - The user's Firebase Auth UID
 * @param {object} progress - Progress data to save
 */
export const saveUserProgress = async (userId, progress) => {
  try {
    const progressRef = doc(db, 'users', userId, 'data', 'progress');
    await setDoc(progressRef, {
      ...progress,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user progress:', error);
    throw error;
  }
};

/**
 * Update a specific field in user settings
 * @param {string} userId - The user's Firebase Auth UID
 * @param {string} key - Setting key to update
 * @param {any} value - New value
 */
export const updateUserSetting = async (userId, key, value) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'data', 'settings');
    await updateDoc(settingsRef, {
      [key]: value,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    // If document doesn't exist, create it
    if (error.code === 'not-found') {
      await saveUserSettings(userId, { [key]: value });
    } else {
      console.error('Error updating user setting:', error);
      throw error;
    }
  }
};

/**
 * Migrate localStorage data to Firestore
 * Useful for first-time users who have local data
 * @param {string} userId - The user's Firebase Auth UID
 */
export const migrateLocalStorageToFirestore = async (userId) => {
  try {
    // Get localStorage data
    const localSettings = localStorage.getItem('cadens-corner-settings');
    const localProgress = localStorage.getItem('cadens-corner-progress');

    // Migrate settings if they exist
    if (localSettings) {
      const settings = JSON.parse(localSettings);
      await saveUserSettings(userId, settings);
      console.log('Settings migrated to Firestore');
    }

    // Migrate progress if it exists
    if (localProgress) {
      const progress = JSON.parse(localProgress);
      await saveUserProgress(userId, progress);
      console.log('Progress migrated to Firestore');
    }

    // Clear localStorage after successful migration
    localStorage.removeItem('cadens-corner-settings');
    localStorage.removeItem('cadens-corner-progress');

    return true;
  } catch (error) {
    console.error('Error migrating localStorage to Firestore:', error);
    return false;
  }
};
