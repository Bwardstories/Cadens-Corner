import React, { useState } from 'react';
import { Volume2, Star, Trophy, ChevronRight } from 'lucide-react';

const WordStructure = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedWords, setCompletedWords] = useState([]);

  // Word library with phonetic breakdown and color coding
  const words = [
    {
      word: 'cat',
      sounds: [
        { letter: 'c', sound: 'k', color: 'bg-red-200' },
        { letter: 'a', sound: 'æ', color: 'bg-blue-200' },
        { letter: 't', sound: 't', color: 'bg-green-200' }
      ],
      image: '🐱',
      audio: 'cat'
    },
    {
      word: 'dog',
      sounds: [
        { letter: 'd', sound: 'd', color: 'bg-purple-200' },
        { letter: 'o', sound: 'ɑ', color: 'bg-yellow-200' },
        { letter: 'g', sound: 'g', color: 'bg-pink-200' }
      ],
      image: '🐕',
      audio: 'dog'
    },
    {
      word: 'bat',
      sounds: [
        { letter: 'b', sound: 'b', color: 'bg-orange-200' },
        { letter: 'a', sound: 'æ', color: 'bg-blue-200' },
        { letter: 't', sound: 't', color: 'bg-green-200' }
      ],
      image: '🦇',
      audio: 'bat'
    },
    {
      word: 'sun',
      sounds: [
        { letter: 's', sound: 's', color: 'bg-yellow-300' },
        { letter: 'u', sound: 'ʌ', color: 'bg-red-300' },
        { letter: 'n', sound: 'n', color: 'bg-blue-300' }
      ],
      image: '☀️',
      audio: 'sun'
    },
    {
      word: 'pig',
      sounds: [
        { letter: 'p', sound: 'p', color: 'bg-pink-300' },
        { letter: 'i', sound: 'ɪ', color: 'bg-purple-300' },
        { letter: 'g', sound: 'g', color: 'bg-green-300' }
      ],
      image: '🐷',
      audio: 'pig'
    }
  ];

  const currentWordData = words[currentWord];

  // Text-to-speech function
  const speakWord = (text, rate = 0.7) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakSound = (letter, rate = 0.5) => {
    // Map letters to their phonetic sounds
    const phoneticSounds = {
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
      'i': 'ih'
    };

    const phoneticSound = phoneticSounds[letter.toLowerCase()] || letter;
    speakWord(phoneticSound, rate);
  };

  const handleWordClick = () => {
    speakWord(currentWordData.word, 0.7);
  };

  const handleSoundClick = (sound) => {
    speakSound(sound.letter, 0.6);
  };

  const handleNextWord = () => {
    setCompletedWords([...completedWords, currentWordData.word]);
    setScore(score + 10);
    setStreak(streak + 1);

    if (currentWord < words.length - 1) {
      setCurrentWord(currentWord + 1);
    } else {
      setCurrentWord(0);
    }
  };

  const handlePracticeAgain = () => {
    speakWord(currentWordData.word, 0.7);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Header with Stats */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" fill="currentColor" />
              <span className="font-bold text-lg">{score} points</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-orange-500" />
              <span className="font-bold text-lg">{streak} streak</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Word {currentWord + 1} of {words.length}
          </div>
        </div>
      </div>

      {/* Main Learning Area */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Image */}
          <div className="text-center mb-8">
            <div className="text-9xl mb-4">{currentWordData.image}</div>
          </div>

          {/* Whole Word - Clickable */}
          <div className="text-center mb-8">
            <button
              onClick={handleWordClick}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl text-4xl font-bold hover:scale-105 transition-transform shadow-lg"
            >
              <Volume2 size={40} />
              {currentWordData.word}
            </button>
            <p className="text-gray-600 mt-2">Click to hear the word</p>
          </div>

          {/* Individual Sounds - Color Coded */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
              Break it down into sounds:
            </h3>
            <div className="flex justify-center gap-4">
              {currentWordData.sounds.map((sound, index) => (
                <button
                  key={index}
                  onClick={() => handleSoundClick(sound)}
                  className={`${sound.color} hover:scale-110 transition-transform rounded-xl p-6 shadow-md min-w-[100px]`}
                >
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {sound.letter}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Volume2 size={16} />
                    /{sound.sound}/
                  </div>
                </button>
              ))}
            </div>
            <p className="text-gray-600 text-center mt-4">Click each letter to hear its sound</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={handlePracticeAgain}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Volume2 size={20} />
              Practice Again
            </button>
            <button
              onClick={handleNextWord}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              I Got It!
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Progress Section */}
        {completedWords.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-3 text-gray-700">Words Practiced Today:</h3>
            <div className="flex flex-wrap gap-2">
              {completedWords.map((word, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold"
                >
                  {word} ✓
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordStructure;
