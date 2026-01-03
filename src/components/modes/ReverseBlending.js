import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Check, HelpCircle } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import Header from '../layout/Header';
import FeedbackMessage from '../common/FeedbackMessage';
import SoundTile from '../common/SoundTile';
import { words } from '../../data/words';
import { generateFeedback } from '../../utils/feedbackGenerator';

/**
 * Reverse Blending Mode
 * Feature #4: Sound Detective
 *
 * Student hears a word and must break it into sounds
 * Reverse of WordStructure - tests sound isolation skills
 */
const ReverseBlending = () => {
  const { speak, speakSound } = useAudio();
  const { trackAttempt } = useProgressTracking();

  // Game state
  const [currentWord, setCurrentWord] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [selectedSounds, setSelectedSounds] = useState([]);
  const [availableSounds, setAvailableSounds] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Initialize with first word
  useEffect(() => {
    loadNewWord();
  }, []);

  /**
   * Load a new word
   */
  const loadNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];

    // Create pool of sounds (correct sounds + distractors)
    const correctSounds = word.sounds;
    const allSounds = words.flatMap(w => w.sounds);

    // Get 3-4 distractor sounds that aren't in the word
    const distractors = allSounds
      .filter(s => !correctSounds.some(cs => cs.phoneme === s.phoneme))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(4, correctSounds.length));

    // Combine and shuffle
    const soundPool = [...correctSounds, ...distractors]
      .sort(() => Math.random() - 0.5);

    setCurrentWord(word);
    setAvailableSounds(soundPool);
    setSelectedSounds([]);
    setHasPlayed(false);
    setFeedback(null);
    setShowHint(false);
    setAttempts(0);
  };

  /**
   * Play the current word
   */
  const playWord = () => {
    if (!currentWord) return;
    speak(currentWord.word, { rate: 0.6 });
    setHasPlayed(true);
  };

  /**
   * Handle sound selection
   */
  const handleSoundSelect = (sound) => {
    if (feedback) return; // Don't allow changes after submission

    // Add sound to selected list
    setSelectedSounds([...selectedSounds, sound]);
  };

  /**
   * Remove a sound from selection
   */
  const handleSoundRemove = (index) => {
    if (feedback) return;
    const newSelected = [...selectedSounds];
    newSelected.splice(index, 1);
    setSelectedSounds(newSelected);
  };

  /**
   * Check answer
   */
  const handleCheck = () => {
    if (selectedSounds.length === 0) return;

    setAttempts(attempts + 1);
    setTotalAttempts(totalAttempts + 1);

    // Check if sounds match (order and content)
    const isCorrect =
      selectedSounds.length === currentWord.sounds.length &&
      selectedSounds.every((selected, index) => {
        return selected.phoneme === currentWord.sounds[index].phoneme;
      });

    // Track attempt
    trackAttempt('word', currentWord.word, isCorrect, {
      mode: 'reverse_blending',
      soundCount: currentWord.sounds.length,
      userCount: selectedSounds.length
    });

    // Track each sound
    currentWord.sounds.forEach((sound, index) => {
      const userGotIt = selectedSounds[index]?.phoneme === sound.phoneme;
      trackAttempt('sound', sound.phoneme, userGotIt, {
        mode: 'reverse_blending',
        word: currentWord.word,
        position: index
      });
    });

    // Generate feedback
    const feedbackData = generateFeedback(isCorrect, {
      mode: 'reverse_blending',
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
  };

  /**
   * Show hint (reveal first sound)
   */
  const handleShowHint = () => {
    setShowHint(true);
    if (selectedSounds.length === 0) {
      setSelectedSounds([currentWord.sounds[0]]);
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
    setSelectedSounds([]);
    setFeedback(null);
    setShowHint(false);
    setHasPlayed(false);
  };

  if (!currentWord) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
  const canCheck = selectedSounds.length > 0 && !feedback;

  return (
    <div className="p-4">
      {/* Header */}
      <Header
        score={score}
        streak={streak}
        currentMode="Sound Detective"
        progressText={`${correctCount} of ${totalAttempts} correct (${accuracy}%)`}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Instructions Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentWord.image}</div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Break this word into sounds
            </h2>

            <button
              onClick={playWord}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 transition-all duration-200 shadow-lg mb-4"
            >
              <Volume2 size={32} />
              {hasPlayed ? 'Hear Again' : 'Hear Word'}
            </button>

            {!hasPlayed && (
              <p className="text-sm text-gray-500">Click to hear the word</p>
            )}
          </div>

          {/* Selected Sounds Area */}
          {hasPlayed && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
                  Your Answer (tap sounds in order):
                </h3>
                <div className="min-h-[100px] p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex gap-3 flex-wrap justify-center items-center">
                  {selectedSounds.length === 0 ? (
                    <p className="text-gray-400">Select sounds from below</p>
                  ) : (
                    selectedSounds.map((sound, index) => (
                      <button
                        key={index}
                        onClick={() => handleSoundRemove(index)}
                        className="relative group"
                        disabled={feedback !== null}
                      >
                        <SoundTile
                          sound={sound}
                          size="lg"
                          showPhoneme
                          disabled={feedback !== null}
                        />
                        {!feedback && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            ×
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Available Sounds */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
                  Choose from these sounds:
                </h3>
                <div className="flex gap-3 flex-wrap justify-center">
                  {availableSounds.map((sound, index) => (
                    <button
                      key={index}
                      onClick={() => handleSoundSelect(sound)}
                      disabled={feedback !== null}
                    >
                      <SoundTile
                        sound={sound}
                        size="lg"
                        showPhoneme
                        onClick={() => speakSound(sound.phoneme)}
                        disabled={feedback !== null}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                {!feedback && (
                  <>
                    <button
                      onClick={handleCheck}
                      disabled={!canCheck}
                      className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                        canCheck
                          ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Check size={24} />
                      Check Answer
                    </button>

                    {attempts >= 1 && !showHint && (
                      <button
                        onClick={handleShowHint}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        <HelpCircle size={20} />
                        Show Hint
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Hint */}
              {showHint && !feedback && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <p className="text-purple-800">
                    <strong>Hint:</strong> The first sound is{' '}
                    <span className="font-bold text-lg">{currentWord.sounds[0].phoneme}</span>
                  </p>
                </div>
              )}
            </>
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

        {/* Show Correct Answer */}
        {feedback && feedback.type === 'incorrect' && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-green-900 mb-4 text-center flex items-center justify-center gap-2">
              <Check size={20} />
              Correct Answer:
            </h3>
            <div className="flex gap-3 justify-center">
              {currentWord.sounds.map((sound, index) => (
                <SoundTile
                  key={index}
                  sound={sound}
                  size="lg"
                  showPhoneme
                  onClick={() => speakSound(sound.phoneme)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Try Again Button */}
        {feedback && (
          <div className="flex justify-center">
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

export default ReverseBlending;
