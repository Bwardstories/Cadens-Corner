import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Headphones,
  Move,
  Music,
  Search,
  Focus,
  Volume2,
  Mic,
  ChevronRight,
  Star
} from 'lucide-react';
import { MODES } from '../../constants/routes';
import { useAppContext } from '../../context/AppContext';

/**
 * Home / Landing Page
 * Card-based menu showing all available modes
 */
const Home = () => {
  const navigate = useNavigate();
  const { getLastVisitedMode, recordModeVisit } = useAppContext();

  const lastVisitedMode = getLastVisitedMode();

  // Icon mapping
  const iconMap = {
    BookOpen,
    Headphones,
    Move,
    Music,
    Search,
    Focus,
    Volume2,
    Mic
  };

  // Difficulty colors
  const difficultyColors = {
    beginner: 'bg-green-50 text-green-700 border-green-200',
    intermediate: 'bg-blue-50 text-blue-700 border-blue-200',
    advanced: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const handleModeClick = (mode) => {
    recordModeVisit(mode.name);
    navigate(mode.path);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-800 mb-3">
          Welcome to Caden's Corner
        </h1>
        <p className="text-lg text-gray-600">
          Choose a mode to practice your listening and sound skills
        </p>
      </div>

      {/* Continue where you left off */}
      {lastVisitedMode && (
        <div className="mb-8 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="text-blue-600" fill="currentColor" />
              <div>
                <p className="text-sm text-gray-600">Continue where you left off</p>
                <p className="font-semibold text-gray-800">{lastVisitedMode}</p>
              </div>
            </div>
            <button
              onClick={() => {
                const mode = Object.values(MODES).find(m => m.name === lastVisitedMode);
                if (mode) handleModeClick(mode);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              Continue
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Mode Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(MODES).map((mode) => {
          const Icon = iconMap[mode.icon];

          return (
            <button
              key={mode.path}
              onClick={() => handleModeClick(mode)}
              className={`
                bg-white rounded-xl shadow-md hover:shadow-xl
                transition-all duration-200
                p-6 text-left
                hover:scale-105 active:scale-95
                border-2 border-transparent hover:border-blue-300
                ${mode.isCritical ? 'ring-2 ring-orange-300' : ''}
              `}
            >
              {/* Icon and Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                  {Icon && <Icon size={32} className="text-blue-600" />}
                </div>

                {mode.isCritical && (
                  <span className="px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Mode Name */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {mode.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {mode.description}
              </p>

              {/* Difficulty Badge */}
              <div className="flex items-center justify-between">
                <span className={`
                  px-3 py-1 text-xs font-medium rounded-full border
                  ${difficultyColors[mode.difficulty]}
                `}>
                  {mode.difficulty.charAt(0).toUpperCase() + mode.difficulty.slice(1)}
                </span>

                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Practice at your own pace. Every session builds your skills.</p>
      </div>
    </div>
  );
};

export default Home;
