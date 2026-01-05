/**
 * Firebase Configuration
 *
 * To get your Firebase config:
 * 1. Go to https://console.firebase.google.com/project/cadens-corner/settings/general
 * 2. Scroll down to "Your apps" section
 * 3. Click on the web app (</>) or create one if it doesn't exist
 * 4. Copy the firebaseConfig object and paste it below
 */

// TODO: Replace with your actual Firebase config from Firebase Console
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "cadens-corner.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "cadens-corner",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "cadens-corner.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID"
};
