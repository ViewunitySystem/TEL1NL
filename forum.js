
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  doc, getDoc, setDoc,
  collection, addDoc, getDocs,
  query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const postForm = document.getElementById("postForm");
const postsList = document.getElementById("postsList");
const loginSection = document.getElementById("loginSection");
const forumSection = document.getElementById("forumSection");

let currentUserProfile = null;

// Login
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      alert("Login erfolgreich!");
    } catch (err) {
      alert("Login fehlgeschlagen: " + err.message);
    }
  });
}

// Registrierung
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const bio = document.getElementById("regBio").value;
    const avatarUrl = document.getElementById("regAvatar").value;
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPassword").value;
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCred.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        bio: bio,
        avatar: avatarUrl
      });
      alert("Registrierung erfolgreich!");
    } catch (err) {
      alert("Registrierung fehlgeschlagen: " + err.message);
    }
  });
}

// Passwort zurücksetzen
const resetForm = document.getElementById("resetForm");
if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value;
    try {
      await sendPasswordResetEmail(auth, email);
      alert("E-Mail zur Passwort-Zurücksetzung gesendet.");
    } catch (err) {
      alert("Fehler beim Zurücksetzen: " + err.message);
    }
  });
}

// Auth-Zustand verwalten
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginSection.style.display = "none";
    forumSection.style.display = "block";

    const postsSnapshot = await getDocs(query(collection(db, "posts"), orderBy("timestamp", "desc")));
    postsList.innerHTML = "";
    postsSnapshot.forEach(doc => {
      const data = doc.data();
      const postDiv = document.createElement("div");
      postDiv.className = "post";
      postDiv.innerHTML = `<h3>${data.title}</h3><p>${data.content}</p><small>von ${data.author}</small>`;
      postsList.appendChild(postDiv);
    });

  } else {
    loginSection.style.display = "block";
    forumSection.style.display = "none";
  }
});

// Beitrag absenden
if (postForm) {
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("postTitle").value;
    const content = tinymce.get("postContent").getContent();
    const user = auth.currentUser;
    if (!user) return alert("Bitte zuerst einloggen.");

    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      author: user.email,
      timestamp: serverTimestamp()
    });

    alert("Beitrag gepostet!");
    postForm.reset();
    tinymce.get("postContent").setContent("");
  });
}
