import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      alert("Login fehlgeschlagen: " + err.message);
    }
  });
}

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
    } catch (err) {
      alert("Registrierung fehlgeschlagen: " + err.message);
    }
  });
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    currentUserProfile = docSnap.exists() ? docSnap.data() : { name: user.email };
    if (loginSection) loginSection.style.display = "none";
    if (forumSection) forumSection.style.display = "block";
    initEditor();
    loadPosts();
  } else {
    currentUserProfile = null;
    if (forumSection) forumSection.style.display = "none";
    if (loginSection) loginSection.style.display = "block";
  }
});

function initEditor() {
  if (typeof tinymce !== "undefined" && !tinymce.get("postContent")) {
    tinymce.init({
      selector: "#postContent",
      plugins: "lists link image emoticons code",
      toolbar: "undo redo | bold italic | bullist numlist | link image | emoticons | code",
      menubar: false,
      height: 300,
      branding: false
    });
  }
}

if (postForm) {
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUserProfile) {
      alert("Bitte melde dich an.");
      return;
    }
    const title = document.getElementById("postTitle").value;
    let content = tinymce.get("postContent") ? tinymce.get("postContent").getContent() : "";
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        author: currentUserProfile.name,
        timestamp: serverTimestamp()
      });
      postForm.reset();
      if (tinymce.get("postContent")) tinymce.get("postContent").setContent("");
      loadPosts();
    } catch (err) {
      alert("Fehler beim Speichern: " + err.message);
    }
  });
}

async function loadPosts() {
  if (!postsList) return;
  const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(postsQuery);
  postsList.innerHTML = "";
  querySnapshot.forEach((docSnap) => {
    const post = docSnap.data();
    let dateStr = post.timestamp ? post.timestamp.toDate().toLocaleString() : "";
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<h3>${post.title}</h3><p><b>${post.author}</b> am <i>${dateStr}</i></p><div>${post.content}</div>`;
    postsList.appendChild(div);
  });
}
