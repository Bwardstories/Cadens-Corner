/**
 * Feedback Messages Data
 * Feature #7: Error-Friendly Feedback
 *
 * Age-appropriate, supportive messages for a 13-year-old
 * NO harsh "wrong" language - always encouraging and respectful
 */

export const feedbackMessages = {
  // Correct answer feedback
  correct: {
    general: [
      'Great listening!',
      'You caught that!',
      'Nice work!',
      'You\'re really hearing the difference',
      'You\'re getting good at this',
      'You nailed it!',
      'Well done!',
      'You got it!'
    ],

    // Streak-specific messages
    streak: {
      3: 'Three in a row!',
      5: 'You\'re on a roll!',
      7: 'Seven correct! You\'re mastering this!',
      10: 'Ten in a row! Excellent!',
      15: 'Fifteen! You\'re on fire!'
    }
  },

  // Incorrect answer feedback (NEVER harsh or negative)
  incorrect: {
    general: [
      'That one is tricky—let\'s hear it again',
      'These sounds are really similar, listen closely',
      'Good try—want to hear the difference?',
      'Let\'s break that down together',
      'These are tough to tell apart—try again',
      'Listen carefully to the difference',
      'That\'s a challenging one, let\'s practice',
      'You\'re building your listening skills'
    ],

    // Specific sound pair feedback
    specific: {
      '/θ/ vs /f/': {
        message: 'These both use your teeth, but /θ/ uses your tongue too',
        tip: 'For "th" sound, put your tongue between your teeth'
      },
      '/b/ vs /d/': {
        message: 'Try feeling where your tongue is for each sound',
        tip: '/b/ uses your lips, /d/ uses your tongue on the roof of your mouth'
      },
      '/m/ vs /n/': {
        message: 'Both are hummed through your nose',
        tip: '/m/ closes your lips, /n/ opens your mouth'
      },
      '/p/ vs /b/': {
        message: 'Both use your lips—one is voiced, one isn\'t',
        tip: 'Feel your throat for /b/, it vibrates'
      },
      '/t/ vs /d/': {
        message: 'Both use your tongue behind your teeth',
        tip: '/d/ makes your throat vibrate, /t/ doesn\'t'
      },
      '/k/ vs /g/': {
        message: 'Both use the back of your tongue',
        tip: '/g/ vibrates your throat, /k/ doesn\'t'
      },
      '/f/ vs /v/': {
        message: 'Both use your teeth on your lip',
        tip: '/v/ vibrates your throat, /f/ doesn\'t'
      },
      '/s/ vs /z/': {
        message: 'Both make a hissing sound',
        tip: '/z/ vibrates like a buzzing bee'
      }
    }
  },

  // Encouragement (after multiple attempts)
  encouragement: [
    'You\'re building your listening skills',
    'Every practice makes you stronger',
    'These sounds take time—you\'re doing great',
    'You\'re training your brain to hear differences',
    'Keep going—you\'ve got this',
    'Practice makes progress!',
    'You\'re getting better with each try'
  ],

  // Hints (progressive, shown after attempts)
  hints: {
    level1: [
      'Listen for the first sound',
      'Pay attention to where your tongue goes',
      'Notice which part of your mouth makes the sound'
    ],
    level2: [
      'Try saying both words out loud',
      'Feel the difference in your mouth',
      'One sound might feel more in the front of your mouth'
    ],
    level3: [
      'Let me play both words for you to compare',
      'Here\'s what makes them different...',
      'Watch where the sound is made'
    ]
  }
};

/**
 * Get a random message from an array
 */
export const getRandomMessage = (messages) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    return '';
  }
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * Get streak message if applicable
 */
export const getStreakMessage = (streak) => {
  const streakMessages = feedbackMessages.correct.streak;
  return streakMessages[streak] || null;
};
