import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

/**
 * Navigation component
 * Persistent top navigation bar with Home and Settings buttons
 */
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === ROUTES.HOME;
  const isSettings = location.pathname === ROUTES.SETTINGS;

  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left: Home button */}
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              transition-colors duration-200
              ${isHome
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </button>

          {/* Center: App title */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Caden's Corner
            </h1>
          </div>

          {/* Right: Settings button */}
          <button
            onClick={() => navigate(ROUTES.SETTINGS)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              transition-colors duration-200
              ${isSettings
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
