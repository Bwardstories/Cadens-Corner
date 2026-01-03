import React from 'react';
import { Check, Info, Volume2, Lightbulb } from 'lucide-react';
import SpeakableText from './SpeakableText';

/**
 * FeedbackMessage Component
 * Feature #7: Error-Friendly Feedback
 *
 * Displays supportive, age-appropriate feedback
 * NO harsh "wrong" messages - always encouraging
 *
 * @param {object} feedback - Feedback object from feedbackGenerator
 * @param {function} onReplay - Callback to replay audio
 * @param {function} onShowHint - Callback to show hint
 * @param {function} onNext - Callback for next question
 */
const FeedbackMessage = ({
  feedback,
  onReplay,
  onShowHint,
  onNext,
  className = ''
}) => {
  if (!feedback) return null;

  const Icon = feedback.icon === 'check' ? Check : Info;

  return (
    <div
      className={`
        rounded-xl p-6 border-2 animate-fade-in
        ${feedback.bgColor}
        ${feedback.borderColor}
        ${className}
      `}
    >
      {/* Main Message */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`flex-shrink-0 ${feedback.textColor}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <p className={`text-lg font-medium ${feedback.textColor}`}>
            {feedback.message}
          </p>

          {/* Suggestion (for incorrect answers after multiple attempts) */}
          {feedback.suggestion && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {feedback.suggestion}
            </p>
          )}

          {/* Tip (for specific sound pairs) - with audio */}
          {feedback.tip && (
            <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-1">
                <Lightbulb size={16} />
                <span className="text-sm font-medium">Tip:</span>
              </div>
              <SpeakableText
                text={feedback.tip}
                className="text-sm text-gray-700 dark:text-gray-300"
                iconSize={14}
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* Replay Button (for incorrect answers) */}
        {feedback.showReplay && onReplay && (
          <button
            onClick={onReplay}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <Volume2 size={18} />
            Hear it again
          </button>
        )}

        {/* Hint Button (after 2+ attempts) */}
        {feedback.showHint && onShowHint && (
          <button
            onClick={onShowHint}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
          >
            <Lightbulb size={18} />
            Show me the difference
          </button>
        )}

        {/* Next/Continue Button (for correct answers) */}
        {feedback.type === 'correct' && onNext && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <Check size={18} />
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackMessage;
