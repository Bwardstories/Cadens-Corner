import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Login Component
 * Simple Google Sign-In for user authentication
 * Age-appropriate design for 13-year-old
 */
const Login = () => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError('Unable to sign in. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Caden's Corner
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your personal space to practice and grow
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Sign In to Continue
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Your progress and settings will be saved across all your devices
          </p>

          {/* Google Sign-In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg
              transition-all duration-200 shadow-lg
              ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105'
              }
              text-white
            `}
          >
            <LogIn size={24} />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Privacy Note */}
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
            We only use your account to save your progress.<br />
            Your data is private and secure.
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No account needed - just sign in with Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
