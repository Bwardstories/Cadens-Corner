import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

/**
 * AppContext Provider
 * Manages global application state including settings, theme, and session info
 */
export const AppProvider = ({ children }) => {
  // Persistent settings stored in localStorage
  const [settings, setSettings] = useLocalStorage('cadens-corner-settings', {
    speechRate: 0.7,
    noiseLevel: 'none', // 'none', 'light', 'moderate'
    theme: 'calm-neutral', // Feature #9: Age-respectful theme
    voiceGender: 'neutral'
  });

  // Session state (not persisted)
  const [session, setSession] = useState({
    startTime: Date.now(),
    modesVisited: [],
    totalInteractions: 0
  });

  /**
   * Update a specific setting
   * @param {string} key - The setting key
   * @param {*} value - The new value
   */
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
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
