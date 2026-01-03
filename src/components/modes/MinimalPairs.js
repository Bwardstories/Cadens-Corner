import React, { useState, useEffect } from 'react';
import { Volume2, Settings2, RotateCcw } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useAppContext } from '../../context/AppContext';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import Header from '../layout/Header';
import FeedbackMessage from '../common/FeedbackMessage';
import SpeakableText from '../common/SpeakableText';
import { getRandomPair } from '../../data/minimalPairs';
import { generateFeedback } from '../../utils/feedbackGenerator';

/**
 * Minimal Pairs Listening Game
 * Feature #1 - CRITICAL
 *
 * Helps distinguish similar sounds (thirteen vs fourteen, bat vs dat, etc.)
 * Three modes: exaggerated, normal, background noise
 * NOW WITH Feature #8: Tracks performance and adapts difficulty
 */
const MinimalPairs = () => {
  const { speak } = useAudio();
  const { settings } = useAppContext();
  const { trackAttempt } = useProgressTracking();

  // Game state
  const [currentPair, setCurrentPair] = useState(null);
  const [playedWord, setPlayedWord] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [attempts, setAttempts] = useState(0);

  // Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Mode settings
  const [speechMode, setSpeechMode] = useState('normal'); // 'exaggerated', 'normal', 'noise'
  const [showModeSettings, setShowModeSettings] = useState(false);

  // Initialize with first pair
  useEffect(() => {
    loadNewPair();
  }, []);

  /**
   * Load a new word pair
   */
  const loadNewPair = () => {
    const pair = getRandomPair();
    if (pair) {
      setCurrentPair(pair);
      setHasPlayed(false);
      setSelectedWord(null);
      setFeedback(null);
      setAttempts(0);

      // Randomly choose which word to play
      const wordIndex = Math.floor(Math.random() * 2);
      setPlayedWord(pair.pair[wordIndex]);
    }
  };

  /**
   * Play the current word with the selected speech mode
   */
  const playCurrentWord = () => {
    if (!playedWord) return;

    let options = {};

    switch (speechMode) {
      case 'exaggerated':
        // Very slow, exaggerated pronunciation
        options = {
          rate: 0.4,
          pitch: 1.2
        };
        break;

      case 'normal':
        // Normal speech rate
        options = {
          rate: settings.speechRate || 0.7
        };
        break;

      case 'noise':
        // TODO: Add background noise implementation
        // For now, use slightly faster rate to simulate difficulty
        options = {
          rate: settings.speechRate + 0.1 || 0.8
        };
        break;

      default:
        options = {};
    }

    speak(playedWord, options);
    setHasPlayed(true);
  };

  /**
   * Handle word selection
   */
  const handleWordSelect = (word) => {
    if (selectedWord || !hasPlayed) return; // Already answered or haven't played yet

    setSelectedWord(word);
    setTotalAttempts(totalAttempts + 1);
    setAttempts(attempts + 1);

    const isCorrect = word === playedWord;

    // Track attempt (Feature #8: Progress Tracking)
    trackAttempt('pair', currentPair.pair, isCorrect, {
      difficultySound: currentPair.difficultySound,
      speechMode,
      playedWord
    });

    // Also track the specific sound being practiced
    if (currentPair.difficultySound) {
      trackAttempt('sound', currentPair.difficultySound, isCorrect, {
        pair: currentPair.pair,
        speechMode
      });
    }

    // Generate feedback
    const feedbackData = generateFeedback(isCorrect, {
      mode: 'minimal_pairs',
      difficultySound: currentPair.difficultySound,
      streak: isCorrect ? streak + 1 : 0,
      attempts: attempts + 1,
      pair: currentPair.pair
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
  };

  /**
   * Replay the current word
   */
  const handleReplay = () => {
    playCurrentWord();
  };

  /**
   * Show comparison (play both words)
   */
  const handleShowComparison = () => {
    // Play both words back-to-back with labels
    speak(`First word: ${currentPair.pair[0]}`, { pauseBefore: 0 });
    speak(`Second word: ${currentPair.pair[1]}`, { pauseBefore: 2000 });
  };

  /**
   * Play a specific word (for word buttons)
   */
  const handlePlayWord = (word) => {
    speak(word);
  };

  /**
   * Move to next pair
   */
  const handleNext = () => {
    loadNewPair();
  };

  /**
   * Try again (same pair)
   */
  const handleTryAgain = () => {
    setSelectedWord(null);
    setFeedback(null);
    setHasPlayed(false);
  };

  if (!currentPair) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  return (
    <div className="p-4">
      {/* Header */}
      <Header
        score={score}
        streak={streak}
        currentMode="Minimal Pairs"
        progressText={`${correctCount} of ${totalAttempts} correct (${accuracy}%)`}
      />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        {/* Mode Settings Toggle */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowModeSettings(!showModeSettings)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Settings2 size={20} />
            <span>Mode: {speechMode.charAt(0).toUpperCase() + speechMode.slice(1)}</span>
          </button>
        </div>

        {/* Mode Settings Panel */}
        {showModeSettings && (
          <div className="mb-6 p-4 bg-white rounded-xl shadow-md border-2 border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Speech Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setSpeechMode('exaggerated')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  speechMode === 'exaggerated'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">Exaggerated</div>
                <div className="text-sm text-gray-600">Slow, clear pronunciation</div>
              </button>
              <button
                onClick={() => setSpeechMode('normal')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  speechMode === 'normal'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">Normal</div>
                <div className="text-sm text-gray-600">Regular speech</div>
              </button>
              <button
                onClick={() => setSpeechMode('noise')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  speechMode === 'noise'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">With Noise</div>
                <div className="text-sm text-gray-600">Advanced challenge</div>
              </button>
            </div>
          </div>
        )}

        {/* Play Word Button */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Listen carefully and choose the word you hear
            </h2>

            <button
              onClick={playCurrentWord}
              disabled={selectedWord !== null}
              className={`
                inline-flex items-center gap-3 px-8 py-4 rounded-xl text-2xl font-bold
                transition-all duration-200 shadow-lg
                ${selectedWord
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105'
                }
              `}
            >
              <Volume2 size={32} />
              {hasPlayed ? 'Play Again' : 'Play Word'}
            </button>

            {!hasPlayed && (
              <p className="text-sm text-gray-500 mt-2">Click to hear the word</p>
            )}
          </div>

          {/* Word Choices */}
          {hasPlayed && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {currentPair.pair.map((word, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => handleWordSelect(word)}
                    disabled={selectedWord !== null}
                    className={`
                      w-full p-8 rounded-xl text-3xl font-bold border-4 transition-all duration-200
                      ${selectedWord === null
                        ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:scale-105'
                        : selectedWord === word
                          ? word === playedWord
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-red-300 bg-red-50 text-red-800'
                          : 'border-gray-200 bg-gray-50 text-gray-400'
                      }
                    `}
                  >
                    {word}
                  </button>
                  {/* Hear Word Button */}
                  {selectedWord === null && (
                    <button
                      onClick={() => handlePlayWord(word)}
                      className="absolute top-2 right-2 p-2 bg-white hover:bg-blue-50 rounded-lg shadow-md transition-colors border border-gray-200"
                      title={`Hear "${word}"`}
                    >
                      <Volume2 size={20} className="text-blue-600" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Hear Both Words Button (after incorrect answer) */}
          {selectedWord && selectedWord !== playedWord && (
            <div className="mt-6 text-center">
              <button
                onClick={handleShowComparison}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors mx-auto"
              >
                <Volume2 size={20} />
                Hear Both Words
              </button>
            </div>
          )}

          {/* Exaggeration Tips (shown before first play) - with audio */}
          {!hasPlayed && currentPair.exaggerationTips && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <Volume2 size={16} />
                Listen for (click any text to hear it):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {currentPair.pair.map((word, index) => (
                  <div key={index} className="text-gray-700">
                    <SpeakableText
                      text={word}
                      className="font-medium text-purple-700"
                      iconSize={14}
                    />
                    :{' '}
                    <SpeakableText
                      text={currentPair.exaggerationTips[word]}
                      showIcon={false}
                      className="text-gray-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <FeedbackMessage
            feedback={feedback}
            onReplay={handleReplay}
            onShowHint={handleShowComparison}
            onNext={handleNext}
            className="mb-6"
          />
        )}

        {/* Try Again / Next Buttons */}
        {selectedWord && (
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

export default MinimalPairs;
