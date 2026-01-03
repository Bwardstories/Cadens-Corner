import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import Navigation from './components/layout/Navigation';
import Home from './components/modes/Home';
import WordStructure from './components/reading/WordStructure';
import MinimalPairs from './components/modes/MinimalPairs';
import SettingsPanel from './components/settings/SettingsPanel';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <AppProvider>
      <AudioProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Navigation />

            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.WORD_STRUCTURE} element={<WordStructure />} />
              <Route path={ROUTES.MINIMAL_PAIRS} element={<MinimalPairs />} />
              <Route path={ROUTES.SETTINGS} element={<SettingsPanel />} />

              {/* Placeholders for future modes */}
              <Route
                path={ROUTES.SOUND_SLIDER}
                element={<ComingSoon mode="Sound Blending" />}
              />
              <Route
                path={ROUTES.SYLLABLE_BEAT}
                element={<ComingSoon mode="Syllable Beat" />}
              />
              <Route
                path={ROUTES.REVERSE_BLENDING}
                element={<ComingSoon mode="Sound Detective" />}
              />
              <Route
                path={ROUTES.SOUND_ISOLATION}
                element={<ComingSoon mode="Sound Focus" />}
              />
              <Route
                path={ROUTES.AUDIO_ONLY}
                element={<ComingSoon mode="Audio Challenge" />}
              />
              <Route
                path={ROUTES.VOICE_COMPARISON}
                element={<ComingSoon mode="Voice Match" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AudioProvider>
    </AppProvider>
  );
}

// Placeholder component for modes not yet implemented
const ComingSoon = ({ mode }) => (
  <div className="max-w-2xl mx-auto px-4 py-16 text-center">
    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{mode}</h2>
    <p className="text-lg text-gray-600 mb-8">This mode is coming soon!</p>
    <a
      href={ROUTES.HOME}
      className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
    >
      Back to Home
    </a>
  </div>
);

export default App;
