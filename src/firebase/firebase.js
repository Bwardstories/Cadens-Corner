import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { firebaseConfig } from './config';

/**
 * Initialize Firebase
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase Authentication
 * Supports Google Sign-In for easy login
 */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

/**
 * Firestore Database
 * Replaces localStorage for cloud-based data storage
 */
export const db = getFirestore(app);

/**
 * Enable offline persistence
 * Allows app to work offline and sync when back online
 */
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Persistence not available in this browser');
    }
  });
} catch (err) {
  console.error('Error enabling persistence:', err);
}

export default app;
