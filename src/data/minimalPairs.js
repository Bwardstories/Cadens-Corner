/**
 * Minimal Pairs Data
 * Feature #1: Minimal Pair Listening Games (CRITICAL)
 *
 * Pairs of words that differ by only ONE sound
 * Critical for auditory processing and phonemic awareness
 */

export const minimalPairs = [
  // CRITICAL: thirteen vs fourteen (the main issue!)
  {
    id: 'pair_001',
    pair: ['thirteen', 'fourteen'],
    phonemes: ['/θɜrˈtin/', '/fɔrˈtin/'],
    difference: 'initial_consonant',
    difficultySound: '/θ/ vs /f/',
    difficulty: 'hard',
    category: 'numbers',
    exaggerationTips: {
      thirteen: 'Put your tongue BETWEEN your teeth for the "th" sound',
      fourteen: 'Touch your top teeth to your BOTTOM lip for the "f" sound'
    },
    visualCue: 'Thirteen starts with your tongue out, fourteen starts with teeth on lip'
  },

  // More teen numbers (similar pattern)
  {
    id: 'pair_002',
    pair: ['thirteen', 'thirty'],
    phonemes: ['/θɜrˈtin/', '/ˈθɜrti/'],
    difference: 'stress_pattern',
    difficultySound: 'stress on -TEEN vs THIR-',
    difficulty: 'medium',
    category: 'numbers',
    exaggerationTips: {
      thirteen: 'Stress the SECOND part: thir-TEEN',
      thirty: 'Stress the FIRST part: THIR-ty'
    },
    visualCue: 'THIRTEEN (loud at end) vs THIRTY (loud at start)'
  },

  {
    id: 'pair_003',
    pair: ['fifteen', 'fifty'],
    phonemes: ['/fɪfˈtin/', '/ˈfɪfti/'],
    difference: 'stress_pattern',
    difficultySound: 'stress on -TEEN vs FIF-',
    difficulty: 'medium',
    category: 'numbers',
    exaggerationTips: {
      fifteen: 'Stress: fif-TEEN',
      fifty: 'Stress: FIF-ty'
    }
  },

  // /b/ vs /d/ (common confusion)
  {
    id: 'pair_004',
    pair: ['bat', 'dat'],
    phonemes: ['/bæt/', '/dæt/'],
    difference: 'initial_consonant',
    difficultySound: '/b/ vs /d/',
    difficulty: 'medium',
    category: 'cvc_words',
    exaggerationTips: {
      bat: 'Press your LIPS together for /b/',
      dat: 'Touch your TONGUE to the roof of your mouth for /d/'
    },
    visualCue: 'B uses lips, D uses tongue'
  },

  {
    id: 'pair_005',
    pair: ['bed', 'dead'],
    phonemes: ['/bɛd/', '/dɛd/'],
    difference: 'initial_consonant',
    difficultySound: '/b/ vs /d/',
    difficulty: 'medium',
    category: 'words',
    exaggerationTips: {
      bed: 'Lips pop for /b/',
      dead: 'Tongue taps for /d/'
    }
  },

  // /m/ vs /n/ (nasal sounds)
  {
    id: 'pair_006',
    pair: ['sum', 'sun'],
    phonemes: ['/sʌm/', '/sʌn/'],
    difference: 'final_consonant',
    difficultySound: '/m/ vs /n/',
    difficulty: 'medium',
    category: 'words',
    exaggerationTips: {
      sum: 'Close your lips for /m/',
      sun: 'Open your mouth, tongue touches roof for /n/'
    },
    visualCue: 'M closes lips, N opens mouth'
  },

  {
    id: 'pair_007',
    pair: ['ram', 'ran'],
    phonemes: ['/ræm/', '/ræn/'],
    difference: 'final_consonant',
    difficultySound: '/m/ vs /n/',
    difficulty: 'medium',
    category: 'words'
  },

  // /p/ vs /b/ (voiced vs voiceless)
  {
    id: 'pair_008',
    pair: ['pat', 'bat'],
    phonemes: ['/pæt/', '/bæt/'],
    difference: 'initial_consonant',
    difficultySound: '/p/ vs /b/',
    difficulty: 'easy',
    category: 'cvc_words',
    exaggerationTips: {
      pat: '/p/ is like a puff of air—no voice',
      bat: '/b/ makes your throat vibrate—feel it!'
    },
    visualCue: 'Put your hand on your throat: B vibrates, P doesn\'t'
  },

  {
    id: 'pair_009',
    pair: ['pen', 'ben'],
    phonemes: ['/pɛn/', '/bɛn/'],
    difference: 'initial_consonant',
    difficultySound: '/p/ vs /b/',
    difficulty: 'easy',
    category: 'words'
  },

  // /t/ vs /d/ (voiced vs voiceless)
  {
    id: 'pair_010',
    pair: ['tin', 'din'],
    phonemes: ['/tɪn/', '/dɪn/'],
    difference: 'initial_consonant',
    difficultySound: '/t/ vs /d/',
    difficulty: 'easy',
    category: 'words',
    exaggerationTips: {
      tin: '/t/ is a quick tap—no voice',
      din: '/d/ makes your throat buzz'
    }
  },

  {
    id: 'pair_011',
    pair: ['write', 'ride'],
    phonemes: ['/raɪt/', '/raɪd/'],
    difference: 'final_consonant',
    difficultySound: '/t/ vs /d/',
    difficulty: 'medium',
    category: 'words'
  },

  // /k/ vs /g/ (voiced vs voiceless)
  {
    id: 'pair_012',
    pair: ['cap', 'gap'],
    phonemes: ['/kæp/', '/gæp/'],
    difference: 'initial_consonant',
    difficultySound: '/k/ vs /g/',
    difficulty: 'easy',
    category: 'words'
  },

  {
    id: 'pair_013',
    pair: ['back', 'bag'],
    phonemes: ['/bæk/', '/bæg/'],
    difference: 'final_consonant',
    difficultySound: '/k/ vs /g/',
    difficulty: 'easy',
    category: 'words'
  },

  // /f/ vs /v/ (voiced vs voiceless)
  {
    id: 'pair_014',
    pair: ['fan', 'van'],
    phonemes: ['/fæn/', '/væn/'],
    difference: 'initial_consonant',
    difficultySound: '/f/ vs /v/',
    difficulty: 'easy',
    category: 'words',
    exaggerationTips: {
      fan: 'Teeth on lip, blow air—no voice',
      van: 'Teeth on lip, make it buzz'
    }
  },

  // /s/ vs /z/ (voiced vs voiceless)
  {
    id: 'pair_015',
    pair: ['sip', 'zip'],
    phonemes: ['/sɪp/', '/zɪp/'],
    difference: 'initial_consonant',
    difficultySound: '/s/ vs /z/',
    difficulty: 'easy',
    category: 'words',
    exaggerationTips: {
      sip: 'Hiss like a snake—sss',
      zip: 'Buzz like a bee—zzz'
    }
  },

  {
    id: 'pair_016',
    pair: ['ice', 'eyes'],
    phonemes: ['/aɪs/', '/aɪz/'],
    difference: 'final_consonant',
    difficultySound: '/s/ vs /z/',
    difficulty: 'medium',
    category: 'words'
  },

  // Short vowels (very important!)
  {
    id: 'pair_017',
    pair: ['bit', 'bet'],
    phonemes: ['/bɪt/', '/bɛt/'],
    difference: 'vowel',
    difficultySound: '/ɪ/ vs /ɛ/',
    difficulty: 'medium',
    category: 'vowels'
  },

  {
    id: 'pair_018',
    pair: ['pet', 'pat'],
    phonemes: ['/pɛt/', '/pæt/'],
    difference: 'vowel',
    difficultySound: '/ɛ/ vs /æ/',
    difficulty: 'medium',
    category: 'vowels'
  },

  {
    id: 'pair_019',
    pair: ['cot', 'cut'],
    phonemes: ['/kɑt/', '/kʌt/'],
    difference: 'vowel',
    difficultySound: '/ɑ/ vs /ʌ/',
    difficulty: 'hard',
    category: 'vowels'
  },

  {
    id: 'pair_020',
    pair: ['ship', 'sheep'],
    phonemes: ['/ʃɪp/', '/ʃip/'],
    difference: 'vowel',
    difficultySound: '/ɪ/ vs /i/',
    difficulty: 'medium',
    category: 'vowels'
  }
];

/**
 * Get pairs by difficulty level
 */
export const getPairsByDifficulty = (difficulty) => {
  return minimalPairs.filter(pair => pair.difficulty === difficulty);
};

/**
 * Get pairs by category
 */
export const getPairsByCategory = (category) => {
  return minimalPairs.filter(pair => pair.category === category);
};

/**
 * Get a random pair
 */
export const getRandomPair = (exclude = []) => {
  const available = minimalPairs.filter(pair => !exclude.includes(pair.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};

/**
 * Get the critical pair (thirteen vs fourteen)
 */
export const getCriticalPair = () => {
  return minimalPairs.find(pair => pair.id === 'pair_001');
};
