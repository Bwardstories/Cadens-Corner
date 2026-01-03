import { useCallback } from 'react';

/**
 * Custom hook for text-to-speech functionality using Web Speech API
 * Extracted from WordStructure.js and enhanced for reuse across all modes
 */
export const useTextToSpeech = () => {
  /**
   * Speak text using browser's speech synthesis
   * @param {string} text - The text to speak
   * @param {object} options - Speech options
   * @param {number} options.rate - Speech rate (0.1 to 10, default 0.7)
   * @param {number} options.pitch - Speech pitch (0 to 2, default 1)
   * @param {number} options.volume - Speech volume (0 to 1, default 1)
   * @param {number} options.pauseBefore - Delay before speaking in ms (default 0)
   */
  const speak = useCallback((text, options = {}) => {
    const {
      rate = 0.7,
      pitch = 1,
      volume = 1,
      pauseBefore = 0
    } = options;

    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;
        window.speechSynthesis.speak(utterance);
      }, pauseBefore);
    } else {
      console.warn('Speech Synthesis not supported in this browser');
    }
  }, []);

  /**
   * Speak a phoneme using pronounceable phonetic sounds
   * @param {string} phoneme - The phoneme to speak (e.g., '/k/', '/æ/')
   * @param {object} options - Speech options (same as speak)
   */
  const speakPhoneme = useCallback((phoneme, options = {}) => {
    // Map IPA phonemes to pronounceable sounds
    const phoneticMap = {
      // Consonants
      '/k/': 'kuh',
      '/c/': 'kuh',
      '/t/': 'tuh',
      '/p/': 'puh',
      '/b/': 'buh',
      '/d/': 'duh',
      '/g/': 'guh',
      '/f/': 'fuh',
      '/v/': 'vuh',
      '/s/': 'sss',
      '/z/': 'zzz',
      '/θ/': 'th', // thin
      '/ð/': 'th', // this
      '/ʃ/': 'sh',
      '/ʒ/': 'zh',
      '/h/': 'huh',
      '/m/': 'mmm',
      '/n/': 'nnn',
      '/ŋ/': 'ng',
      '/l/': 'lll',
      '/r/': 'rrr',
      '/w/': 'wuh',
      '/j/': 'yuh',

      // Vowels
      '/æ/': 'at',
      '/a/': 'ah',
      '/ɑ/': 'awe',
      '/e/': 'eh',
      '/ɛ/': 'eh',
      '/i/': 'ee',
      '/ɪ/': 'ih',
      '/o/': 'oh',
      '/ɔ/': 'awe',
      '/u/': 'oo',
      '/ʊ/': 'uh',
      '/ʌ/': 'uh',
      '/ɜr/': 'er',
      '/ər/': 'er',
    };

    const pronounceableSound = phoneticMap[phoneme] || phoneme;

    // Phonemes typically spoken slower
    const defaultRate = options.rate || 0.5;
    speak(pronounceableSound, { ...options, rate: defaultRate });
  }, [speak]);

  /**
   * Speak a sound by letter (for backward compatibility)
   * @param {string} letter - The letter to speak
   * @param {object} options - Speech options
   */
  const speakSound = useCallback((letter, options = {}) => {
    // Map letters to their phonetic sounds (backward compatible with WordStructure)
    const letterPhonetics = {
      'c': 'kuh',
      'a': 'at',
      't': 'tuh',
      'd': 'duh',
      'o': 'awe',
      'g': 'g',
      'b': 'buh',
      's': 'sss',
      'u': 'uh',
      'n': 'nnn',
      'p': 'puh',
      'i': 'ih',
      'e': 'eh',
      'f': 'fuh',
      'h': 'huh',
      'j': 'juh',
      'k': 'kuh',
      'l': 'lll',
      'm': 'mmm',
      'r': 'rrr',
      'v': 'vuh',
      'w': 'wuh',
      'x': 'ks',
      'y': 'yuh',
      'z': 'zzz'
    };

    const phoneticSound = letterPhonetics[letter.toLowerCase()] || letter;
    const defaultRate = options.rate || 0.6;
    speak(phoneticSound, { ...options, rate: defaultRate });
  }, [speak]);

  /**
   * Stop any ongoing speech
   */
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  /**
   * Check if speech synthesis is available
   */
  const isSupported = 'speechSynthesis' in window;

  return {
    speak,
    speakPhoneme,
    speakSound,
    stopSpeaking,
    isSupported
  };
};
