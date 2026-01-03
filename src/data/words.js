/**
 * Word Library
 * Phonetic breakdown and color coding for words
 * Used in WordStructure and ReverseBlending modes
 */

export const words = [
  {
    word: 'cat',
    sounds: [
      { letter: 'c', phoneme: 'k', color: 'bg-red-200' },
      { letter: 'a', phoneme: 'æ', color: 'bg-blue-200' },
      { letter: 't', phoneme: 't', color: 'bg-green-200' }
    ],
    image: '🐱',
    audio: 'cat'
  },
  {
    word: 'dog',
    sounds: [
      { letter: 'd', phoneme: 'd', color: 'bg-purple-200' },
      { letter: 'o', phoneme: 'ɑ', color: 'bg-yellow-200' },
      { letter: 'g', phoneme: 'g', color: 'bg-pink-200' }
    ],
    image: '🐕',
    audio: 'dog'
  },
  {
    word: 'bat',
    sounds: [
      { letter: 'b', phoneme: 'b', color: 'bg-orange-200' },
      { letter: 'a', phoneme: 'æ', color: 'bg-blue-200' },
      { letter: 't', phoneme: 't', color: 'bg-green-200' }
    ],
    image: '🦇',
    audio: 'bat'
  },
  {
    word: 'sun',
    sounds: [
      { letter: 's', phoneme: 's', color: 'bg-yellow-300' },
      { letter: 'u', phoneme: 'ʌ', color: 'bg-red-300' },
      { letter: 'n', phoneme: 'n', color: 'bg-blue-300' }
    ],
    image: '☀️',
    audio: 'sun'
  },
  {
    word: 'pig',
    sounds: [
      { letter: 'p', phoneme: 'p', color: 'bg-pink-300' },
      { letter: 'i', phoneme: 'ɪ', color: 'bg-purple-300' },
      { letter: 'g', phoneme: 'g', color: 'bg-green-300' }
    ],
    image: '🐷',
    audio: 'pig'
  },
  {
    word: 'run',
    sounds: [
      { letter: 'r', phoneme: 'r', color: 'bg-red-300' },
      { letter: 'u', phoneme: 'ʌ', color: 'bg-orange-300' },
      { letter: 'n', phoneme: 'n', color: 'bg-blue-300' }
    ],
    image: '🏃',
    audio: 'run'
  },
  {
    word: 'hat',
    sounds: [
      { letter: 'h', phoneme: 'h', color: 'bg-purple-300' },
      { letter: 'a', phoneme: 'æ', color: 'bg-blue-200' },
      { letter: 't', phoneme: 't', color: 'bg-green-200' }
    ],
    image: '🎩',
    audio: 'hat'
  },
  {
    word: 'bed',
    sounds: [
      { letter: 'b', phoneme: 'b', color: 'bg-orange-200' },
      { letter: 'e', phoneme: 'ɛ', color: 'bg-green-300' },
      { letter: 'd', phoneme: 'd', color: 'bg-purple-200' }
    ],
    image: '🛏️',
    audio: 'bed'
  },
  {
    word: 'cup',
    sounds: [
      { letter: 'c', phoneme: 'k', color: 'bg-red-200' },
      { letter: 'u', phoneme: 'ʌ', color: 'bg-red-300' },
      { letter: 'p', phoneme: 'p', color: 'bg-pink-300' }
    ],
    image: '☕',
    audio: 'cup'
  },
  {
    word: 'bus',
    sounds: [
      { letter: 'b', phoneme: 'b', color: 'bg-orange-200' },
      { letter: 'u', phoneme: 'ʌ', color: 'bg-red-300' },
      { letter: 's', phoneme: 's', color: 'bg-yellow-300' }
    ],
    image: '🚌',
    audio: 'bus'
  }
];

export default words;
