import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Check, X } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import Header from '../layout/Header';
import FeedbackMessage from '../common/FeedbackMessage';
import SpeakableText from '../common/SpeakableText';
import { getRandomSyllableWord } from '../../data/syllablePatterns';
import { generateFeedback } from '../../utils/feedbackGenerator';

/**
 * Syllable Beat Mode
 * Feature #3: Helps identify syllables and stress patterns
 *
 * Students listen to words and tap out the syllables
 * Visual beat indicators show stressed vs unstressed syllables
 */
const SyllableBeat = () => {
  const { speak } = useAudio();
  const { trackAttempt } = useProgressTracking();

  // Game state
  const [currentWord, setCurrentWord] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [userTaps, setUserTaps] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Difficulty filter
  const [difficulty, setDifficulty] = useState('easy');

  // Initialize with first word
  useEffect(() => {
    loadNewWord();
  }, [difficulty]);

  /**
   * Load a new word
   */
  const loadNewWord = () => {
    const word = getRandomSyllableWord({ difficulty });
    if (word) {
      setCurrentWord(word);
      setHasPlayed(false);
      setUserTaps([]);
      setFeedback(null);
      setShowAnswer(false);
      setAttempts(0);
    }
  };

  /**
   * Play the current word
   * Emphasizes syllables with pauses
   */
  const playWord = () => {
    if (!currentWord) return;

    // Play full word first
    speak(currentWord.word, { rate: 0.6 });

    // Then play syllables separately with emphasis
    setTimeout(() => {
      currentWord.syllables.forEach((syllable, index) => {
        const stress = currentWord.stressPattern[index];
        const isStressed = stress === 1;

        setTimeout(() => {
          speak(syllable, {
            rate: isStressed ? 0.5 : 0.6,
            pitch: isStressed ? 1.2 : 1.0,
            volume: isStressed ? 1.0 : 0.8
          });
        }, index * 800); // 800ms between syllables
      });
    }, 1500); // Wait 1.5s after full word

    setHasPlayed(true);
  };

  /**
   * Handle user tapping a syllable count
   */
  const handleSyllableGuess = (count) => {
    if (showAnswer) return;

    const isCorrect = count === currentWord.syllables.length;
    setUserTaps([...Array(count)].map((_, i) => i));
    setAttempts(attempts + 1);
    setTotalAttempts(totalAttempts + 1);

    // Track attempt
    trackAttempt('word', currentWord.word, isCorrect, {
      mode: 'syllable_beat',
      syllableCount: currentWord.syllables.length,
      userGuess: count,
      difficulty
    });

    // Generate feedback
    const feedbackData = generateFeedback(isCorrect, {
      mode: 'syllable_beat',
      streak: isCorrect ? streak + 1 : 0,
      attempts: attempts + 1
    });

    setFeedback(feedbackData);

    // Update stats
    if (isCorrect) {
      setScore(score + 10);
      setStreak(streak + 1);
      setCorrectCount(correctCount + 1);
    } else {
      setStreak(0);
    }

    // Show answer after 2 incorrect attempts
    if (!isCorrect && attempts >= 1) {
      setShowAnswer(true);
    }
  };

  /**
   * Move to next word
   */
  const handleNext = () => {
    loadNewWord();
  };

  /**
   * Try again with same word
   */
  const handleTryAgain = () => {
    setUserTaps([]);
    setFeedback(null);
    setShowAnswer(false);
    setHasPlayed(false);
  };

  if (!currentWord) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  return (
    <div className="p-4">
      {/* Header */}
      <Header
        score={score}
        streak={streak}
        currentMode="Syllable Beat"
        progressText={`${correctCount} of ${totalAttempts} correct (${accuracy}%)`}
      />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        {/* Difficulty Selector */}
        <div className="mb-6 flex justify-end gap-3">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                difficulty === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Word Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentWord.image}</div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How many syllables do you hear?
            </h2>

            <button
              onClick={playWord}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Volume2 size={32} />
              {hasPlayed ? 'Play Again' : 'Play Word'}
            </button>

            {!hasPlayed && (
              <p className="text-sm text-gray-500 mt-2">Listen carefully for the beats</p>
            )}
          </div>

          {/* Syllable Count Buttons */}
          {hasPlayed && !feedback && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  onClick={() => handleSyllableGuess(count)}
                  className="p-6 rounded-xl text-3xl font-bold border-4 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:scale-105 transition-all duration-200"
                >
                  {count}
                  <div className="text-sm font-normal text-gray-600 mt-1">
                    {count === 1 ? 'syllable' : 'syllables'}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Show Answer */}
          {showAnswer && (
            <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-4 text-lg flex items-center gap-2">
                <Check size={20} />
                The answer is {currentWord.syllables.length} syllable{currentWord.syllables.length > 1 ? 's' : ''}
              </h3>

              {/* Visual syllable breakdown with beats */}
              <div className="flex justify-center gap-4 mb-4">
                {currentWord.syllables.map((syllable, index) => {
                  const isStressed = currentWord.stressPattern[index] === 1;
                  return (
                    <div key={index} className="text-center">
                      <div className={`text-4xl mb-2 ${isStressed ? 'text-purple-700' : 'text-gray-500'}`}>
                        {isStressed ? '●' : '○'}
                      </div>
                      <SpeakableText
                        text={syllable}
                        className={`text-xl font-semibold ${isStressed ? 'text-purple-700' : 'text-gray-600'}`}
                        iconSize={16}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Audio clue */}
              <div className="text-center">
                <SpeakableText
                  text={currentWord.audioClues.tip}
                  className="text-sm text-gray-700"
                  iconSize={14}
                />
              </div>
            </div>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <FeedbackMessage
            feedback={feedback}
            onReplay={playWord}
            onNext={handleNext}
            className="mb-6"
          />
        )}

        {/* Action Buttons */}
        {(feedback || showAnswer) && (
          <div className="flex justify-center gap-4">
            <button
              onClick={handleTryAgain}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              <RotateCcw size={20} />
              Try This One Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyllableBeat;
