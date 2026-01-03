import React from 'react';
import { Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

/**
 * Reusable AudioButton component
 * Plays audio when clicked using the global AudioContext
 *
 * @param {string} text - The text to speak
 * @param {object} options - Speech options (rate, pitch, volume, pauseBefore)
 * @param {string} label - Button label (defaults to text)
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Button variant ('primary', 'secondary', 'neutral')
 * @param {string} size - Button size ('sm', 'md', 'lg')
 * @param {boolean} showIcon - Whether to show the volume icon
 */
const AudioButton = ({
  text,
  options = {},
  label,
  className = '',
  variant = 'primary',
  size = 'md',
  showIcon = true,
  children
}) => {
  const { speak, isPlaying } = useAudio();

  const handleClick = () => {
    speak(text, options);
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
    neutral: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-500 hover:bg-green-600 text-white'
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-xl',
    xl: 'px-8 py-4 text-4xl'
  };

  // Icon sizes
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 32,
    xl: 40
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPlaying}
      className={`
        inline-flex items-center gap-2
        rounded-lg font-semibold
        transition-all duration-200
        hover:scale-105 active:scale-95
        shadow-md hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {showIcon && <Volume2 size={iconSizes[size]} />}
      {children || label || text}
    </button>
  );
};

export default AudioButton;
