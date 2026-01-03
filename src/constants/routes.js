/**
 * Application routes configuration
 */

export const ROUTES = {
  HOME: '/',
  WORD_STRUCTURE: '/word-structure',
  MINIMAL_PAIRS: '/minimal-pairs',
  SOUND_SLIDER: '/sound-slider',
  SYLLABLE_BEAT: '/syllable-beat',
  REVERSE_BLENDING: '/reverse-blending',
  SOUND_ISOLATION: '/sound-isolation',
  AUDIO_ONLY: '/audio-only',
  VOICE_COMPARISON: '/voice-comparison',
  SETTINGS: '/settings'
};

/**
 * Mode configurations with metadata
 */
export const MODES = {
  WORD_STRUCTURE: {
    path: ROUTES.WORD_STRUCTURE,
    name: 'Word Structure',
    description: 'Break words into sounds and learn phonics',
    icon: 'BookOpen',
    difficulty: 'beginner'
  },
  MINIMAL_PAIRS: {
    path: ROUTES.MINIMAL_PAIRS,
    name: 'Minimal Pairs',
    description: 'Hear the difference between similar sounds',
    icon: 'Headphones',
    difficulty: 'intermediate',
    isCritical: true // Feature #1 - CRITICAL
  },
  SOUND_SLIDER: {
    path: ROUTES.SOUND_SLIDER,
    name: 'Sound Blending',
    description: 'Watch and hear sounds blend together',
    icon: 'Move',
    difficulty: 'beginner'
  },
  SYLLABLE_BEAT: {
    path: ROUTES.SYLLABLE_BEAT,
    name: 'Syllable Beat',
    description: 'Feel the rhythm and stress in words',
    icon: 'Music',
    difficulty: 'intermediate'
  },
  REVERSE_BLENDING: {
    path: ROUTES.REVERSE_BLENDING,
    name: 'Sound Detective',
    description: 'Find the sounds in words you hear',
    icon: 'Search',
    difficulty: 'intermediate'
  },
  SOUND_ISOLATION: {
    path: ROUTES.SOUND_ISOLATION,
    name: 'Sound Focus',
    description: 'Isolate and compare individual sounds',
    icon: 'Focus',
    difficulty: 'beginner'
  },
  AUDIO_ONLY: {
    path: ROUTES.AUDIO_ONLY,
    name: 'Audio Challenge',
    description: 'Listen without looking at words',
    icon: 'Volume2',
    difficulty: 'advanced'
  },
  VOICE_COMPARISON: {
    path: ROUTES.VOICE_COMPARISON,
    name: 'Voice Match',
    description: 'Compare your voice to the model',
    icon: 'Mic',
    difficulty: 'advanced'
  }
};
