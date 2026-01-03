import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { ROUTES } from '../../constants/routes';

/**
 * Settings Panel
 * Parent controls for speech rate, noise level, theme, etc.
 */
const SettingsPanel = () => {
  const navigate = useNavigate();
  const { settings, updateSetting } = useAppContext();
  const [showSaved, setShowSaved] = useState(false);

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
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
      </div>

      {/* Saved Indicator */}
      {showSaved && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 animate-fade-in">
          <Check size={20} />
          <span>Settings saved</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Speech Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Slower</span>
            <span>{settings.speechRate.toFixed(1)}x</span>
            <span>Faster</span>
          </div>
        </div>

        {/* Noise Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Noise Level (for Minimal Pairs)
          </label>
          <select
            value={settings.noiseLevel}
            onChange={(e) => updateSetting('noiseLevel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="none">None</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
          </select>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => updateSetting('theme', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="calm-neutral">Calm & Neutral</option>
          </select>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            Settings are automatically saved to your browser and will persist across sessions.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Future: Settings will sync to the cloud via Firebase.
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
