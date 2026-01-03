import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import Header from '../layout/Header';
import AudioButton from '../common/AudioButton';
import SoundTile from '../common/SoundTile';

const WordStructure = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedWords, setCompletedWords] = useState([]);

  const { speak, speakSound } = useAudio();

  // Word library with phonetic breakdown and color coding
  const words = [
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
    }
  ];

  const currentWordData = words[currentWord];

  const handleSoundClick = (sound) => {
    speakSound(sound.letter);
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
    speak(currentWordData.word);
  };

  return (
    <div className="p-4">
      {/* Header with Stats */}
      <Header
        score={score}
        streak={streak}
        currentMode="Word Structure"
        progressText={`Word ${currentWord + 1} of ${words.length}`}
      />

      {/* Main Learning Area */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Image */}
          <div className="text-center mb-8">
            <div className="text-9xl mb-4">{currentWordData.image}</div>
          </div>

          {/* Whole Word - Clickable using AudioButton */}
          <div className="text-center mb-8">
            <AudioButton
              text={currentWordData.word}
              variant="primary"
              size="xl"
              className="font-bold"
            >
              {currentWordData.word}
            </AudioButton>
            <p className="text-gray-600 mt-2">Click to hear the word</p>
          </div>

          {/* Individual Sounds - Using SoundTile component */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
              Break it down into sounds:
            </h3>
            <div className="flex justify-center gap-4">
              {currentWordData.sounds.map((sound, index) => (
                <SoundTile
                  key={index}
                  sound={sound}
                  onClick={handleSoundClick}
                  size="md"
                />
              ))}
            </div>
            <p className="text-gray-600 text-center mt-4">Click each letter to hear its sound</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <AudioButton
              text={currentWordData.word}
              variant="secondary"
              size="md"
              onClick={handlePracticeAgain}
            >
              Practice Again
            </AudioButton>
            <button
              onClick={handleNextWord}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
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
