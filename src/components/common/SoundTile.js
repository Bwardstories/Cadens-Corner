import React, { useState, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

/**
 * Reusable SoundTile component
 * Displays a letter/sound with color coding
 * Can be clicked to hear the sound
 * Can be held to hear the sound repeatedly (Feature #5: Sound Isolation)
 *
 * @param {object} sound - Sound object {letter, phoneme, color}
 * @param {function} onClick - Click handler (optional, defaults to speaking)
 * @param {function} onHold - Hold handler (optional, for Feature #5)
 * @param {boolean} isHoldEnabled - Whether hold-to-repeat is enabled
 * @param {boolean} showPhoneme - Whether to show IPA phoneme notation
 * @param {string} size - Tile size ('sm', 'md', 'lg')
 * @param {string} className - Additional CSS classes
 * @param {boolean} isDimmed - Whether the tile should appear dimmed
 */
const SoundTile = ({
  sound,
  onClick,
  onHold,
  isHoldEnabled = false,
  showPhoneme = true,
  size = 'md',
  className = '',
  isDimmed = false
}) => {
  const { speakSound } = useAudio();
  const [isHolding, setIsHolding] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const holdIntervalRef = useRef(null);

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'p-4 min-w-[80px]',
      letter: 'text-3xl',
      phoneme: 'text-xs'
    },
    md: {
      container: 'p-6 min-w-[100px]',
      letter: 'text-5xl',
      phoneme: 'text-sm'
    },
    lg: {
      container: 'p-8 min-w-[120px]',
      letter: 'text-6xl',
      phoneme: 'text-base'
    }
  };

  const config = sizeConfig[size];

  const handleClick = () => {
    if (!isHoldEnabled) {
      if (onClick) {
        onClick(sound);
      } else {
        speakSound(sound.letter);
      }
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsPressed(true);

    if (isHoldEnabled) {
      setIsHolding(true);

      // Speak immediately
      speakSound(sound.letter);

      // Speak repeatedly while holding
      holdIntervalRef.current = setInterval(() => {
        speakSound(sound.letter);
      }, 1200); // Repeat every 1.2 seconds

      if (onHold) {
        onHold(sound);
      }
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setIsHolding(false);

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      handleMouseUp();
    }
  };

  return (
    <button
      className={`
        ${sound.color || 'bg-gray-200'}
        ${config.container}
        rounded-xl
        transition-all duration-200
        ${isHolding ? 'scale-110 shadow-2xl ring-4 ring-blue-400' : 'shadow-md'}
        ${!isDimmed && !isHolding ? 'hover:scale-105 hover:shadow-lg' : ''}
        ${isDimmed ? 'opacity-30 filter grayscale' : 'opacity-100'}
        ${isPressed && !isHoldEnabled ? 'scale-95' : ''}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <div className={`${config.letter} font-bold text-gray-800 mb-2`}>
        {sound.letter}
      </div>

      {showPhoneme && sound.phoneme && (
        <div className={`${config.phoneme} text-gray-600 flex items-center justify-center gap-1`}>
          <Volume2 size={12} />
          /{sound.phoneme}/
        </div>
      )}

      {isHoldEnabled && (
        <div className="text-xs text-gray-500 mt-2">
          {isHolding ? 'Listening...' : 'Hold to repeat'}
        </div>
      )}
    </button>
  );
};

export default SoundTile;
