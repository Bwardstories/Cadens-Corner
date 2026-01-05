import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, LogOut, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

/**
 * Settings Panel
 * Parent controls for speech rate, noise level, theme, etc.
 */
const SettingsPanel = () => {
  const navigate = useNavigate();
  const { settings, updateSetting } = useAppContext();
  const { user, signOut } = useAuth();
  const [showSaved, setShowSaved] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show "saved" message whenever settings change
  useEffect(() => {
    setShowSaved(true);
    const timer = setTimeout(() => setShowSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [settings]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Settings</h1>
      </div>

      {/* Saved Indicator */}
      {showSaved && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-400 animate-fade-in">
          <Check size={20} />
          <span>Settings saved</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6">
        {/* Speech Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Speech Rate
          </label>
          <input
            type="range"
            min="0.3"
            max="1.5"
            step="0.1"
            value={settings.speechRate}
            onChange={(e) => updateSetting('speechRate', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>Slower</span>
            <span>{settings.speechRate.toFixed(1)}x</span>
            <span>Faster</span>
          </div>
        </div>

        {/* Noise Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background Noise Level (for Minimal Pairs)
          </label>
          <select
            value={settings.noiseLevel}
            onChange={(e) => updateSetting('noiseLevel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="none">None</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
          </select>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => updateSetting('theme', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>

        {/* Account Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Account</h3>

          {user && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-100">{user.displayName || 'User'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg font-medium transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Your settings and progress are automatically saved to the cloud and sync across all your devices.
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
