/**
 * Syllable Patterns Data
 * Feature #3: Syllable Beat Mode
 *
 * Words organized by syllable count and stress patterns
 * Helps students identify syllables and stress (rhythm) in words
 */

/**
 * Syllable pattern data structure:
 * {
 *   word: string - The word
 *   syllables: array - Syllable breakdown ['syl', 'la', 'ble']
 *   stressPattern: array - 0 = unstressed, 1 = primary stress, 2 = secondary stress
 *   beatPattern: string - Visual representation '●○○' (● = stressed, ○ = unstressed)
 *   audioClues: object - Helpful tips for identifying syllables
 *   image: string - Emoji or visual aid
 *   difficulty: string - 'easy', 'medium', 'hard'
 * }
 */

// ONE-SYLLABLE WORDS (Foundation - all stressed)
const oneSyllableWords = [
  {
    word: 'cat',
    syllables: ['cat'],
    stressPattern: [1],
    beatPattern: '●',
    audioClues: {
      tip: 'One beat - say it once: CAT',
      emphasis: 'CAT'
    },
    image: '🐱',
    difficulty: 'easy'
  },
  {
    word: 'dog',
    syllables: ['dog'],
    stressPattern: [1],
    beatPattern: '●',
    audioClues: {
      tip: 'One beat - say it once: DOG',
      emphasis: 'DOG'
    },
    image: '🐕',
    difficulty: 'easy'
  },
  {
    word: 'sun',
    syllables: ['sun'],
    stressPattern: [1],
    beatPattern: '●',
    audioClues: {
      tip: 'One beat - say it once: SUN',
      emphasis: 'SUN'
    },
    image: '☀️',
    difficulty: 'easy'
  }
];

// TWO-SYLLABLE WORDS
const twoSyllableWords = [
  {
    word: 'happy',
    syllables: ['hap', 'py'],
    stressPattern: [1, 0], // FIRST syllable stressed
    beatPattern: '●○',
    audioClues: {
      tip: 'Two beats - stress the first: HAP-py',
      emphasis: 'HAP py'
    },
    image: '😊',
    difficulty: 'easy'
  },
  {
    word: 'baby',
    syllables: ['ba', 'by'],
    stressPattern: [1, 0],
    beatPattern: '●○',
    audioClues: {
      tip: 'Two beats - stress the first: BA-by',
      emphasis: 'BA by'
    },
    image: '👶',
    difficulty: 'easy'
  },
  {
    word: 'thirteen',
    syllables: ['thir', 'teen'],
    stressPattern: [0, 1], // SECOND syllable stressed
    beatPattern: '○●',
    audioClues: {
      tip: 'Two beats - stress the SECOND: thir-TEEN',
      emphasis: 'thir TEEN'
    },
    image: '1️⃣3️⃣',
    difficulty: 'medium'
  },
  {
    word: 'fourteen',
    syllables: ['four', 'teen'],
    stressPattern: [0, 1],
    beatPattern: '○●',
    audioClues: {
      tip: 'Two beats - stress the SECOND: four-TEEN',
      emphasis: 'four TEEN'
    },
    image: '1️⃣4️⃣',
    difficulty: 'medium'
  },
  {
    word: 'tiger',
    syllables: ['ti', 'ger'],
    stressPattern: [1, 0],
    beatPattern: '●○',
    audioClues: {
      tip: 'Two beats - stress the first: TI-ger',
      emphasis: 'TI ger'
    },
    image: '🐯',
    difficulty: 'medium'
  },
  {
    word: 'paper',
    syllables: ['pa', 'per'],
    stressPattern: [1, 0],
    beatPattern: '●○',
    audioClues: {
      tip: 'Two beats - stress the first: PA-per',
      emphasis: 'PA per'
    },
    image: '📄',
    difficulty: 'medium'
  },
  {
    word: 'pencil',
    syllables: ['pen', 'cil'],
    stressPattern: [1, 0],
    beatPattern: '●○',
    audioClues: {
      tip: 'Two beats - stress the first: PEN-cil',
      emphasis: 'PEN cil'
    },
    image: '✏️',
    difficulty: 'medium'
  },
  {
    word: 'window',
    syllables: ['win', 'dow'],
    stressPattern: [1, 0],
    beatPattern: '●○',
    audioClues: {
      tip: 'Two beats - stress the first: WIN-dow',
      emphasis: 'WIN dow'
    },
    image: '🪟',
    difficulty: 'medium'
  }
];

// THREE-SYLLABLE WORDS
const threeSyllableWords = [
  {
    word: 'elephant',
    syllables: ['el', 'e', 'phant'],
    stressPattern: [1, 0, 0], // FIRST syllable stressed
    beatPattern: '●○○',
    audioClues: {
      tip: 'Three beats - stress the FIRST: EL-e-phant',
      emphasis: 'EL e phant'
    },
    image: '🐘',
    difficulty: 'medium'
  },
  {
    word: 'banana',
    syllables: ['ba', 'nan', 'a'],
    stressPattern: [0, 1, 0], // MIDDLE syllable stressed
    beatPattern: '○●○',
    audioClues: {
      tip: 'Three beats - stress the MIDDLE: ba-NAN-a',
      emphasis: 'ba NAN a'
    },
    image: '🍌',
    difficulty: 'medium'
  },
  {
    word: 'computer',
    syllables: ['com', 'pu', 'ter'],
    stressPattern: [0, 1, 0],
    beatPattern: '○●○',
    audioClues: {
      tip: 'Three beats - stress the MIDDLE: com-PU-ter',
      emphasis: 'com PU ter'
    },
    image: '💻',
    difficulty: 'hard'
  },
  {
    word: 'dinosaur',
    syllables: ['di', 'no', 'saur'],
    stressPattern: [1, 0, 0],
    beatPattern: '●○○',
    audioClues: {
      tip: 'Three beats - stress the FIRST: DI-no-saur',
      emphasis: 'DI no saur'
    },
    image: '🦕',
    difficulty: 'hard'
  },
  {
    word: 'bicycle',
    syllables: ['bi', 'cy', 'cle'],
    stressPattern: [1, 0, 0],
    beatPattern: '●○○',
    audioClues: {
      tip: 'Three beats - stress the FIRST: BI-cy-cle',
      emphasis: 'BI cy cle'
    },
    image: '🚲',
    difficulty: 'hard'
  },
  {
    word: 'amazing',
    syllables: ['a', 'maz', 'ing'],
    stressPattern: [0, 1, 0],
    beatPattern: '○●○',
    audioClues: {
      tip: 'Three beats - stress the MIDDLE: a-MAZ-ing',
      emphasis: 'a MAZ ing'
    },
    image: '✨',
    difficulty: 'hard'
  }
];

// FOUR-SYLLABLE WORDS (Advanced)
const fourSyllableWords = [
  {
    word: 'watermelon',
    syllables: ['wa', 'ter', 'mel', 'on'],
    stressPattern: [1, 0, 0, 0],
    beatPattern: '●○○○',
    audioClues: {
      tip: 'Four beats - stress the FIRST: WA-ter-mel-on',
      emphasis: 'WA ter mel on'
    },
    image: '🍉',
    difficulty: 'hard'
  },
  {
    word: 'television',
    syllables: ['tel', 'e', 'vi', 'sion'],
    stressPattern: [1, 0, 0, 0],
    beatPattern: '●○○○',
    audioClues: {
      tip: 'Four beats - stress the FIRST: TEL-e-vi-sion',
      emphasis: 'TEL e vi sion'
    },
    image: '📺',
    difficulty: 'hard'
  },
  {
    word: 'ability',
    syllables: ['a', 'bil', 'i', 'ty'],
    stressPattern: [0, 1, 0, 0],
    beatPattern: '○●○○',
    audioClues: {
      tip: 'Four beats - stress the SECOND: a-BIL-i-ty',
      emphasis: 'a BIL i ty'
    },
    image: '⭐',
    difficulty: 'hard'
  }
];

/**
 * Get all words
 */
export const getAllSyllableWords = () => {
  return [
    ...oneSyllableWords,
    ...twoSyllableWords,
    ...threeSyllableWords,
    ...fourSyllableWords
  ];
};

/**
 * Get words by syllable count
 */
export const getWordsBySyllableCount = (count) => {
  switch (count) {
    case 1:
      return oneSyllableWords;
    case 2:
      return twoSyllableWords;
    case 3:
      return threeSyllableWords;
    case 4:
      return fourSyllableWords;
    default:
      return [];
  }
};

/**
 * Get words by difficulty
 */
export const getWordsByDifficulty = (difficulty) => {
  return getAllSyllableWords().filter(word => word.difficulty === difficulty);
};

/**
 * Get a random syllable word
 */
export const getRandomSyllableWord = (options = {}) => {
  const { syllableCount, difficulty } = options;

  let pool = getAllSyllableWords();

  if (syllableCount) {
    pool = getWordsBySyllableCount(syllableCount);
  }

  if (difficulty) {
    pool = pool.filter(word => word.difficulty === difficulty);
  }

  if (pool.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

/**
 * Get words with same stress pattern
 * Useful for pattern practice
 */
export const getWordsByStressPattern = (pattern) => {
  const patternStr = pattern.join('');

  return getAllSyllableWords().filter(word =>
    word.stressPattern.join('') === patternStr
  );
};

export default {
  getAllSyllableWords,
  getWordsBySyllableCount,
  getWordsByDifficulty,
  getRandomSyllableWord,
  getWordsByStressPattern,
  oneSyllableWords,
  twoSyllableWords,
  threeSyllableWords,
  fourSyllableWords
};
