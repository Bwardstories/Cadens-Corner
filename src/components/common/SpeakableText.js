import React from 'react';
import { Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

/**
 * SpeakableText Component
 * Text that can be clicked or hovered to hear it spoken
 * Essential for students who struggle with reading
 *
 * @param {string} text - The text to display and speak
 * @param {string} className - Additional CSS classes
 * @param {boolean} showIcon - Whether to show the speaker icon
 * @param {string} iconPosition - 'left' or 'right'
 * @param {boolean} hoverToPlay - Play on hover instead of click
 */
const SpeakableText = ({
  text,
  className = '',
  showIcon = true,
  iconPosition = 'left',
  hoverToPlay = false,
  iconSize = 16
}) => {
  const { speak } = useAudio();

  const handleClick = () => {
    if (!hoverToPlay) {
      speak(text);
    }
  };

  const handleHover = () => {
    if (hoverToPlay) {
      speak(text);
    }
  };

  return (
    <span
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={`inline-flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors ${className}`}
      title="Click to hear this"
    >
      {showIcon && iconPosition === 'left' && (
        <Volume2 size={iconSize} className="flex-shrink-0" />
      )}
      <span>{text}</span>
      {showIcon && iconPosition === 'right' && (
        <Volume2 size={iconSize} className="flex-shrink-0" />
      )}
    </span>
  );
};

export default SpeakableText;
