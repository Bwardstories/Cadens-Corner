/**
 * Theme Configuration
 * Feature #9: Age-Respectful Themes
 * Designed for 13-year-old, avoiding childish aesthetics
 */

export const themes = {
  'calm-neutral': {
    name: 'Calm & Neutral',
    description: 'Clean, modern design with calm colors',

    colors: {
      // Background gradients
      background: 'from-blue-50 to-purple-50',
      cardBg: 'white',

      // Primary colors
      primary: 'blue-600',
      primaryHover: 'blue-700',
      secondary: 'purple-600',
      secondaryHover: 'purple-700',

      // Feedback colors (Feature #7: Error-friendly)
      success: 'green-600',
      successBg: 'green-50',
      successBorder: 'green-200',

      // NO harsh red for errors - use supportive blue
      feedback: 'blue-500',
      feedbackBg: 'blue-50',
      feedbackBorder: 'blue-200',

      info: 'purple-500',
      infoBg: 'purple-50',
      infoBorder: 'purple-200',

      warning: 'amber-500',
      warningBg: 'amber-50',
      warningBorder: 'amber-200',

      // Text colors
      textPrimary: 'gray-800',
      textSecondary: 'gray-600',
      textMuted: 'gray-500',

      // UI elements
      border: 'gray-200',
      divider: 'gray-300',
      shadow: 'gray-400/20',
    },

    typography: {
      // Clean, readable fonts
      fontFamily: 'font-sans',
      heading: {
        size: 'text-2xl',
        weight: 'font-semibold',
        color: 'text-gray-800'
      },
      subheading: {
        size: 'text-xl',
        weight: 'font-medium',
        color: 'text-gray-700'
      },
      body: {
        size: 'text-base',
        weight: 'font-normal',
        color: 'text-gray-700'
      },
      small: {
        size: 'text-sm',
        weight: 'font-normal',
        color: 'text-gray-600'
      }
    },

    components: {
      button: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-purple-600 hover:bg-purple-700 text-white',
        success: 'bg-green-600 hover:bg-green-700 text-white',
        neutral: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      },
      card: {
        default: 'bg-white rounded-xl shadow-md',
        elevated: 'bg-white rounded-2xl shadow-xl',
        interactive: 'bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow'
      }
    },

    language: {
      // Feature #9: Age-respectful, empowering tone
      successPhrases: [
        'Great listening',
        'You caught that',
        'Nice work',
        'You\'re getting good at this',
        'You\'re building your skills'
      ],

      // Feature #7: Error-friendly, supportive feedback
      encouragementPhrases: [
        'That one is tricky—let\'s hear it again',
        'These sounds are really similar, listen closely',
        'Good try—want to hear the difference?',
        'Let\'s break that down together',
        'You\'re building your listening skills'
      ],

      // Words/phrases to AVOID (too childish)
      avoid: [
        'buddy',
        'champ',
        'superstar',
        'awesome sauce',
        'amazing job!!',
        'you\'re the best!',
        'way to go, sport!'
      ]
    }
  }
};

/**
 * Get theme configuration
 * @param {string} themeName - The name of the theme
 * @returns {object} - The theme configuration
 */
export const getTheme = (themeName = 'calm-neutral') => {
  return themes[themeName] || themes['calm-neutral'];
};

/**
 * Get a random success phrase
 * @param {string} themeName - The theme to get phrase from
 */
export const getSuccessPhrase = (themeName = 'calm-neutral') => {
  const theme = getTheme(themeName);
  const phrases = theme.language.successPhrases;
  return phrases[Math.floor(Math.random() * phrases.length)];
};

/**
 * Get a random encouragement phrase
 * @param {string} themeName - The theme to get phrase from
 */
export const getEncouragementPhrase = (themeName = 'calm-neutral') => {
  const theme = getTheme(themeName);
  const phrases = theme.language.encouragementPhrases;
  return phrases[Math.floor(Math.random() * phrases.length)];
};
