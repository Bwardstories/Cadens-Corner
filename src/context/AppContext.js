import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserSettings, saveUserSettings, migrateLocalStorageToFirestore } from '../firebase/firestoreService';

const AppContext = createContext();

const DEFAULT_SETTINGS = {
  speechRate: 0.7,
  noiseLevel: 'none',
  theme: 'light',
  voiceGender: 'neutral'
};

/**
 * AppContext Provider
 * Manages global application state including settings, theme, and session info
 * NOW USES FIRESTORE instead of localStorage for cloud sync
 */
export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [migrated, setMigrated] = useState(false);

  // Session state (not persisted)
  const [session, setSession] = useState({
    startTime: Date.now(),
    modesVisited: [],
    totalInteractions: 0
  });

  // Load settings from Firestore when user logs in
  useEffect(() => {
    const loadSettings = async () => {
      if (!user) {
        setSettings(DEFAULT_SETTINGS);
        setLoading(false);
        return;
      }

      try {
        // Migrate localStorage data on first login (one-time)
        if (!migrated && localStorage.getItem('cadens-corner-settings')) {
          await migrateLocalStorageToFirestore(user.uid);
          setMigrated(true);
        }

        // Load settings from Firestore
        const firestoreSettings = await getUserSettings(user.uid);
        setSettings(firestoreSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user, migrated]);

  /**
   * Update a specific setting
   * Saves to Firestore in real-time
   * @param {string} key - The setting key
   * @param {*} value - The new value
   */
  const updateSetting = async (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };

    // Update local state immediately for responsive UI
    setSettings(newSettings);

    // Save to Firestore if user is authenticated
    if (user) {
      try {
        await saveUserSettings(user.uid, newSettings);
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    }
  };

  /**
   * Record that a mode was visited
   * @param {string} modeName - The name of the mode
   */
  const recordModeVisit = (modeName) => {
    setSession(prev => ({
      ...prev,
      modesVisited: [...prev.modesVisited, {
        mode: modeName,
        timestamp: Date.now()
      }],
      totalInteractions: prev.totalInteractions + 1
    }));
  };

  /**
   * Get the most recently visited mode
   */
  const getLastVisitedMode = () => {
    if (session.modesVisited.length === 0) return null;
    return session.modesVisited[session.modesVisited.length - 1].mode;
  };

  const value = {
    settings,
    setSettings,
    updateSetting,
    loading,
    session,
    setSession,
    recordModeVisit,
    getLastVisitedMode
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook to use the AppContext
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
