# Caden's Corner - Architecture Plan for 10 New Features

## Overview
Transform Caden's Corner from a single-component app into a modular educational platform for phonemic awareness and auditory processing, designed for a 13-year-old with dyslexia.

## Core Principles
- **Age-appropriate UX** (13-year-old, not child-like)
- **Auditory-first** (sound is primary, minimal visual overload)
- **Error-friendly** (confidence preservation, no harsh "wrong" feedback)
- **Scalable architecture** (easy to add features)

---

## 1. Folder Structure

```
src/
├── App.js                          # Main shell with routing
├── index.js
├── index.css
│
├── components/
│   ├── layout/
│   │   ├── Header.js               # App header with stats ✅
│   │   ├── Navigation.js           # Main navigation/mode selector ✅
│   │   └── ProgressBar.js          # Visual progress indicator
│   │
│   ├── common/                     # Reusable components
│   │   ├── AudioButton.js          # Reusable audio playback button ✅
│   │   ├── SoundTile.js            # Reusable sound tile (used across modes) ✅
│   │   ├── FeedbackMessage.js      # Feature #7 - Error-friendly feedback ✅
│   │   ├── SpeakableText.js        # Text with click-to-hear audio ✅
│   │   ├── StatsDisplay.js         # Score, streak, progress
│   │   └── WordImage.js            # Word image/emoji display
│   │
│   ├── modes/                      # Feature components (one per mode)
│   │   ├── Home.js                 # Landing page with mode selection ✅
│   │   ├── WordStructure.js        # Existing (refactored to use shared code) ✅
│   │   ├── MinimalPairs.js         # Feature #1 - CRITICAL ✅
│   │   ├── SoundSlider.js          # Feature #2 - Blending animation
│   │   ├── SyllableBeat.js         # Feature #3 - Stress patterns
│   │   ├── ReverseBlending.js      # Feature #4 - Word → sounds
│   │   ├── SoundIsolation.js       # Feature #5 - Hold to hear
│   │   ├── AudioOnlyMode.js        # Feature #6 - No text mode
│   │   └── VoiceComparison.js      # Feature #10 - Advanced recording
│   │
│   └── settings/
│       └── SettingsPanel.js        # Parent controls, toggles ✅
│
├── context/                        # Global state management
│   ├── AppContext.js               # Settings, theme, audio preferences ✅
│   ├── AudioContext.js             # TTS state management ✅
│   └── ProgressContext.js          # Feature #8 - Tracking & analytics
│
├── hooks/                          # Custom React hooks
│   ├── useTextToSpeech.js          # Extract TTS from WordStructure ✅
│   ├── useAudioPlayback.js         # General audio playback
│   ├── useAudioRecording.js        # Feature #10 - Recording
│   ├── useProgressTracking.js      # Feature #8 - Track performance
│   ├── useSoundDifficulty.js       # Feature #8 - Adaptive difficulty
│   └── useLocalStorage.js          # Persist data ✅
│
├── utils/                          # Utility functions
│   ├── audioUtils.js               # Audio helpers, noise generation
│   ├── phoneticUtils.js            # Phoneme processing
│   ├── difficultyAdapter.js        # Feature #8 - Difficulty algorithm
│   └── feedbackGenerator.js        # Feature #7 - Friendly messages ✅
│
├── data/                           # Data models
│   ├── words.js                    # Expanded word library ✅
│   ├── minimalPairs.js             # Feature #1 - Pair definitions ✅
│   ├── phonemes.js                 # Phoneme definitions & IPA
│   ├── syllablePatterns.js         # Feature #3 - Syllable data
│   └── feedbackMessages.js         # Feature #7 - Message library ✅
│
└── constants/
    ├── audioSettings.js            # Default speech rates, volumes
    ├── themeConfig.js              # Feature #9 - Age-appropriate themes
    └── routes.js                   # Route paths ✅
```

---

## 2. Navigation System

**Approach:** React Router v6 with Main Menu + Persistent Top Navigation

### Landing Page (Home)
- Card-based menu showing all modes
- Overall stats display
- "Continue where you left off" button
- Clean, age-appropriate design

### Persistent Top Navigation Bar
- Left: Home button
- Center: Current mode name
- Right: Settings icon

### Routing Structure
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/word-structure" element={<WordStructure />} />
  <Route path="/minimal-pairs" element={<MinimalPairs />} />
  <Route path="/sound-slider" element={<SoundSlider />} />
  <Route path="/syllable-beat" element={<SyllableBeat />} />
  <Route path="/reverse-blending" element={<ReverseBlending />} />
  <Route path="/sound-isolation" element={<SoundIsolation />} />
  <Route path="/audio-only" element={<AudioOnlyMode />} />
  <Route path="/voice-comparison" element={<VoiceComparison />} />
  <Route path="/settings" element={<SettingsPanel />} />
</Routes>
```

---

## 3. State Management

**Strategy:** Context API (no Redux needed)

### Three-Layer Context Architecture:

#### Layer 1: AppContext
- Global settings (speech rate, noise level, theme)
- Session info (start time, modes visited)
- Audio preferences

#### Layer 2: ProgressContext (Feature #8)
- Sound accuracy tracking
- Problem sounds identification
- Word history
- Adaptive difficulty state

#### Layer 3: AudioContext
- Web Speech API state
- Audio queue management
- Playback controls

**Component-level state:** Each mode manages its own UI state (current question, selections, animations)

---

## 4. Shared Utilities & Hooks

### Critical Hooks

#### `useTextToSpeech.js`
Extracted from WordStructure.js, enhanced with settings:
- `speak(text, options)` - TTS with rate/pitch/volume
- `speakPhoneme(phoneme, options)` - Phoneme-specific pronunciation

#### `useProgressTracking.js` (Feature #8)
- `recordAttempt(item, isCorrect, metadata)` - Track performance
- `getProblemAreas()` - Identify struggling sounds
- Auto-adapts difficulty based on performance

#### `useAudioRecording.js` (Feature #10)
- `startRecording()` / `stopRecording()`
- `playRecording()` - Playback user's voice
- Uses Web Audio API

### Critical Utilities

#### `feedbackGenerator.js` (Feature #7)
```javascript
generateFeedback(isCorrect, context) → {
  message: "That one is tricky—let's hear it again",
  tone: 'supportive',
  color: 'blue', // NOT red!
  suggestion: "Try listening for where your tongue is"
}
```

#### `audioUtils.js` (Feature #1)
- `addBackgroundNoise(level)` - Generate noise for minimal pairs
- `exaggerateSpeech(utterance)` - Slow, emphasize sounds
- `waitForSpeechReady()` - Handle Chrome voice loading

---

## 5. Data Models

### `words.js` (Expanded)
```javascript
{
  id: 'word_013',
  word: 'thirteen',
  syllables: ['thir', 'teen'],
  stressPattern: [0, 1], // Stress on second syllable
  sounds: [
    { letter: 'th', phoneme: '/θ/', ipa: 'θ', color: 'bg-purple-200', difficulty: 'hard' },
    { letter: 'i', phoneme: '/ɜr/', ipa: 'ɜr', color: 'bg-yellow-200', difficulty: 'medium' },
    // ... more sounds
  ],
  image: '1️⃣3️⃣',
  difficulty: 'intermediate',
  tags: ['number', 'teen', 'multi-syllable']
}
```

### `minimalPairs.js` (Feature #1)
```javascript
{
  id: 'pair_001',
  pair: ['thirteen', 'fourteen'],
  phonemes: ['/θɜrˈtin/', '/fɔrˈtin/'],
  difference: 'initial_consonant',
  difficultySound: '/θ/ vs /f/',
  difficulty: 'hard',
  category: 'numbers',
  exaggerationTips: {
    thirteen: 'Emphasize tongue between teeth for /θ/',
    fourteen: 'Emphasize lip-teeth contact for /f/'
  }
}
```

### `feedbackMessages.js` (Feature #7)
```javascript
{
  correct: {
    general: ['Great listening!', 'You caught that!', 'Nice work!'],
    streak: { 3: 'Three in a row!', 5: 'You\'re on a roll!' }
  },
  incorrect: {
    general: [
      'That one is tricky—let\'s hear it again',
      'These sounds are really similar, listen closely'
    ],
    specific: {
      '/θ/ vs /f/': 'These both use your teeth, but /θ/ uses your tongue too'
    }
  }
}
```

---

## 6. Implementation Order (Phased Approach)

### Phase 1: Foundation (Week 1) - ✅ COMPLETED
**Set up architecture for all features**

- [x] 1. Install dependencies (react-router-dom@6, framer-motion)
- [x] 2. Create folder structure
- [x] 3. Extract shared code (useTextToSpeech hook, AudioButton, SoundTile, AppContext, AudioContext)
- [x] 4. Set up routing (Navigation.js, Header.js, Home.js, update App.js)
- [x] 5. Refactor WordStructure.js to use new shared hooks/components
- [x] Deployed Phase 1 to Firebase

### Phase 2: Critical Features (Week 2-3) - ✅ COMPLETED
**Features #1, #7, #9 (user-requested priorities)**

- [x] 6. **Feature #9: Age-Respectful Themes** - Implemented age-appropriate design throughout all components
- [x] 7. **Feature #7: Error-Friendly Feedback** - Created FeedbackMessage component, feedbackGenerator utility, feedbackMessages data
- [x] 8. **Feature #1: Minimal Pair Listening Games (CRITICAL)** - Created MinimalPairs component with three speech modes (exaggerated, normal, noise)
- [x] **Accessibility Enhancement: SpeakableText component** - All text can be clicked to hear it spoken (critical for non-readers)
- [x] **MinimalPairs enhancements:**
  - Added speaker icons on word choices to preview each word
  - Added "Hear Both Words" button after incorrect answers
  - Made all tips clickable for audio playback
- [x] **Settings improvements** - Back button navigates to previous page instead of always going home
- [x] Deployed Phase 2 to Firebase

### Phase 3: Core Auditory Features (Week 4-5) - ⏸️ PENDING

- [ ] 9. **Feature #8: Personalized Sound Trouble Tracking** - ProgressContext, useProgressTracking hook
- [ ] 10. **Feature #3: Syllable Beat Mode** - SyllableBeat component, syllablePatterns data
- [ ] 11. **Feature #4: Reverse Blending** - ReverseBlending component

### Phase 4: Advanced Interaction (Week 6-7) - ⏸️ PENDING

- [ ] 12. **Feature #2: Sound Slider/Stretching Tool** - SoundSlider with Framer Motion animations
- [ ] 13. **Feature #5: Hold-to-Hear Sound Isolation** - Enhance SoundTile, create SoundIsolation mode
- [ ] 14. **Feature #6: No-Text Audio-Only Mode** - AudioOnlyMode component

### Phase 5: Advanced Feature (Week 8) - ⏸️ PENDING

- [ ] 15. **Feature #10: Voice Comparison** - useAudioRecording hook, VoiceComparison component
- [ ] 16. **Settings Panel** - SettingsPanel with parent controls

### Phase 6: Polish & Testing (Week 9-10) - ⏸️ PENDING

- [ ] 17. Testing, performance optimization, deployment

---

## 7. New Dependencies

Add to `package.json`:
```json
{
  "dependencies": {
    "react-router-dom": "^6.22.0",  // Routing
    "framer-motion": "^11.0.0"       // Animations
  }
}
```

**Everything else uses built-in browser APIs:**
- Web Speech API (TTS)
- Web Audio API (recording)
- localStorage (persistence)

---

## 8. Priority Features - Key Considerations

### Feature #1: Minimal Pair Listening Games (CRITICAL)

**Implementation highlights:**
- Three modes: exaggerated, normal, background noise
- Large, clear buttons (no time pressure)
- Focus on /θ/ vs /f/, /b/ vs /d/, /m/ vs /n/
- Replay always available
- Integrates with Features #7 (feedback) and #8 (tracking)

**UI Flow:**
1. Play audio for random word (thirteen OR fourteen)
2. Show two buttons: "thirteen" | "fourteen"
3. User taps what they heard
4. Feature #7 feedback (supportive, no harsh "wrong")
5. Feature #8 tracks accuracy for /θ/ vs /f/
6. Replay both words for comparison if incorrect

### Feature #7: Error-Friendly Feedback (CRITICAL)

**Language rules:**
- ❌ NEVER: "Wrong!", "Incorrect", "Try again"
- ✅ ALWAYS: "That one's tricky", "Let's hear it again", "Good listening"

**Visual rules:**
- ❌ NO red X's or harsh colors
- ✅ Neutral blue/purple for "not quite"
- ✅ Green/gold for success

**Feedback timing:**
- Immediate response
- Auto-offer replay
- Show hint after 2-3 attempts (not immediately)

### Feature #9: Age-Respectful Themes (CRITICAL)

**Design guidelines:**
- Calm, muted colors (not bright primary colors)
- Modern, professional design
- Clear fonts (no comic sans!)
- No cartoon characters or mascots

**Language guidelines:**
- "Great listening" not "Great job, buddy!"
- "You're building skills" not "You're a superstar!"
- Respectful, empowering tone

**Stats display:**
- "15 sounds mastered" not "You got 15 stars!"
- Ownership: "Your progress", "You practiced"

---

## 9. Critical Files to Create First

**Top 5 files that form the architecture backbone:**

1. **`src/hooks/useTextToSpeech.js`** - Core audio functionality used by every mode
2. **`src/context/AppContext.js`** - Global settings, theme, preferences
3. **`src/data/minimalPairs.js`** - Feature #1 data model
4. **`src/utils/feedbackGenerator.js`** - Feature #7 implementation
5. **`src/components/modes/MinimalPairs.js`** - Feature #1 component validates architecture

---

## 10. Architecture Benefits

✅ **Modular:** Each feature is independent, easy to build/test/maintain
✅ **Shared Foundation:** Hooks/utilities eliminate duplication
✅ **Consistent UX:** Shared components ensure uniform experience
✅ **Age-Appropriate:** Feature #9 baked into every design decision
✅ **Error-Friendly:** Feature #7 integrated into all feedback
✅ **Auditory-First:** Audio utilities are first-class citizens
✅ **Scalable:** Easy to add new modes, words, features
✅ **Performant:** Minimal dependencies, leverages browser APIs

---

## Future Enhancements

### Settings Persistence to Firebase
- [ ] **Replace localStorage with Firebase Firestore** for settings persistence
  - Settings currently save to browser localStorage
  - Future: Sync settings across devices via Firebase
  - Benefits: User settings persist across devices, backup and restore
  - Implementation: Create Firebase service, migrate from useLocalStorage to Firebase hooks

### Progress Tracking Cloud Sync
- [ ] **Feature #8 Enhancement: Cloud-based progress tracking**
  - Currently tracks progress in localStorage
  - Future: Store in Firebase to enable cross-device tracking and analytics
  - Benefits: Track long-term progress, identify patterns across users (with privacy controls)

---

## Current Status

**Last Updated:** 2026-01-03

**Current Phase:** Phase 2 - Critical Features ✅ COMPLETED

**Completed Work:**
- ✅ Phase 1: Complete architecture foundation with routing, contexts, and shared components
- ✅ Phase 2: Implemented Features #1 (Minimal Pairs), #7 (Error-Friendly Feedback), and #9 (Age-Respectful Themes)
- ✅ Accessibility enhancements: SpeakableText component for click-to-hear audio on all text
- ✅ Both phases deployed to Firebase: https://cadens-corner.web.app

**Next Steps - Phase 3: Core Auditory Features**
1. **Feature #8: Personalized Sound Trouble Tracking** (HIGH PRIORITY)
   - Create ProgressContext for tracking student performance
   - Implement useProgressTracking hook
   - Build difficultyAdapter.js for adaptive difficulty
   - Track which sounds student struggles with most

2. **Feature #3: Syllable Beat Mode**
   - Create SyllableBeat component
   - Implement syllablePatterns.js data
   - Visual beat indicators with audio timing

3. **Feature #4: Reverse Blending**
   - Create ReverseBlending component
   - Student hears word and breaks it into sounds
   - Uses shared SoundTile components
