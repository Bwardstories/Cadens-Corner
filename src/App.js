import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import { ProgressProvider } from './context/ProgressContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/layout/Navigation';
import Login from './components/auth/Login';
import Home from './components/modes/Home';
import WordStructure from './components/reading/WordStructure';
import MinimalPairs from './components/modes/MinimalPairs';
import SyllableBeat from './components/modes/SyllableBeat';
import ReverseBlending from './components/modes/ReverseBlending';
import SettingsPanel from './components/settings/SettingsPanel';
import { ROUTES } from './constants/routes';

// Component that checks authentication and shows appropriate UI
function AuthenticatedApp() {
  const { user, loading } = useAuth();
  const { settings } = useAppContext();
  const isDark = settings.theme === 'dark';

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <Login />;
  }

  // Show main app if authenticated
  return <ThemedApp />;
}

// Main app with theme support
function ThemedApp() {
  const { settings } = useAppContext();
  const isDark = settings.theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
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
                element={<SyllableBeat />}
              />
              <Route
                path={ROUTES.REVERSE_BLENDING}
                element={<ReverseBlending />}
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
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AudioProvider>
          <ProgressProvider>
            <BrowserRouter>
              <AuthenticatedApp />
            </BrowserRouter>
          </ProgressProvider>
        </AudioProvider>
      </AppProvider>
    </AuthProvider>
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
