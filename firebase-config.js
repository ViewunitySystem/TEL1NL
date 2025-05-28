
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyALNLHsXb3d8DTpTqs9K50jZMaOZ7H_5u0",
  authDomain: "tel1nlforum-7b6e7.firebaseapp.com",
  projectId: "tel1nlforum-7b6e7",
  storageBucket: "tel1nlforum-7b6e7.firebasestorage.app",
  messagingSenderId: "337441482047",
  appId: "1:337441482047:web:80871798920bfab37a1f8a",
  measurementId: "G-XTG1LHWXW8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
