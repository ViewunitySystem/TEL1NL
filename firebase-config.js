// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyALNLHsXb3d8DTpTqs9K50jZMaOZ7H_5u0",
  authDomain: "tel1nlforum-7b6e7.firebaseapp.com",
  projectId: "tel1nlforum-7b6e7",
  storageBucket: "tel1nlforum-7b6e7.firebasestorage.app",
  messagingSenderId: "337441482047",
  appId: "1:337441482047:web:80871798920bfab37a1f8a",
  measurementId: "G-XTG1LHWXW8"
};

// Firebase-Initialisierung
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ← Das fehlte

export { auth };
