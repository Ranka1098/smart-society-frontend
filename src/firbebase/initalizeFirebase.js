import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD27p5BJdhQ0LOcdmeH8okcNvfuOJaZ9iM",
  authDomain: "fcm-notification-9fd1f.firebaseapp.com",
  projectId: "fcm-notification-9fd1f",
  storageBucket: "fcm-notification-9fd1f.firebasestorage.app",
  messagingSenderId: "1063781122560",
  appId: "1:1063781122560:web:8a8d847341133db82ecee5",
  measurementId: "G-MZK3D3CDJH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
