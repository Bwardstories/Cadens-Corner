import React, { createContext, useContext, useState } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useAppContext } from './AppContext';

const AudioContext = createContext();

/**
 * AudioContext Provider
 * Centralizes audio management and playback across the app
 */
export const AudioProvider = ({ children }) => {
  const { settings } = useAppContext();
  const { speak, speakPhoneme, speakSound, stopSpeaking, isSupported } = useTextToSpeech();

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioQueue, setAudioQueue] = useState([]);

  /**
   * Speak text with global settings applied
   * @param {string} text - The text to speak
   * @param {object} options - Override options
   */
  const speakWithSettings = (text, options = {}) => {
    setIsPlaying(true);

    const mergedOptions = {
      rate: settings.speechRate,
      ...options
    };

    speak(text, mergedOptions);

    // Reset isPlaying after estimated speech duration
    // Rough estimate: 150 words per minute
    const words = text.split(' ').length;
    const estimatedDuration = (words / 150) * 60 * 1000;
    setTimeout(() => setIsPlaying(false), estimatedDuration);
  };

  /**
   * Speak a phoneme with global settings
   */
  const speakPhonemeWithSettings = (phoneme, options = {}) => {
    setIsPlaying(true);
    speakPhoneme(phoneme, options);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  /**
   * Speak a sound/letter with global settings
   */
  const speakSoundWithSettings = (sound, options = {}) => {
    setIsPlaying(true);
    speakSound(sound, options);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  /**
   * Stop all speech
   */
  const stop = () => {
    stopSpeaking();
    setIsPlaying(false);
    setAudioQueue([]);
  };

  /**
   * Queue multiple speech items to play in sequence
   * @param {Array} items - Array of {text, options} objects
   */
  const speakSequence = async (items) => {
    setAudioQueue(items);

    for (const item of items) {
      await new Promise((resolve) => {
        speakWithSettings(item.text, item.options);
        // Wait for speech to complete plus pause
        const pauseDuration = item.pauseAfter || 500;
        setTimeout(resolve, pauseDuration);
      });
    }

    setAudioQueue([]);
  };

  const value = {
    speak: speakWithSettings,
    speakPhoneme: speakPhonemeWithSettings,
    speakSound: speakSoundWithSettings,
    speakSequence,
    stop,
    isPlaying,
    audioQueue,
    isSupported
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

/**
 * Hook to use the AudioContext
 */
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
