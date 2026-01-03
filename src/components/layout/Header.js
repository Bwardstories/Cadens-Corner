import React from 'react';
import { Star, Trophy } from 'lucide-react';

/**
 * Header component displaying stats and current mode
 * Appears at the top of all pages
 *
 * @param {number} score - Current score
 * @param {number} streak - Current streak
 * @param {string} currentMode - Name of the current mode
 * @param {number} progress - Progress indicator (e.g., "Word 3 of 10")
 * @param {string} progressText - Custom progress text
 */
const Header = ({
  score = 0,
  streak = 0,
  currentMode,
  progress,
  progressText,
  showStats = true
}) => {
  return (
    <div className="w-full bg-white shadow-md mb-6">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Stats (if shown) */}
          {showStats && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" fill="currentColor" size={20} />
                <span className="font-semibold text-lg text-gray-800">
                  {score} points
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="text-orange-500" size={20} />
                <span className="font-semibold text-lg text-gray-800">
                  {streak} streak
                </span>
              </div>
            </div>
          )}

          {/* Center: Current mode name */}
          {currentMode && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentMode}
              </h2>
            </div>
          )}

          {/* Right: Progress text */}
          {(progress || progressText) && (
            <div className="text-sm text-gray-600">
              {progressText || progress}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
