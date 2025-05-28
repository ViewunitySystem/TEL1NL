import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const membersList = document.getElementById("membersList");

async function loadMembers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  membersList.innerHTML = "";
  querySnapshot.forEach((docSnap) => {
    const user = docSnap.data();
    const div = document.createElement("div");
    div.className = "member-profile";
    div.innerHTML = \`
      <img src="\${user.avatar || 'avatar_default.png'}" alt="Avatar" class="avatar" />
      <h3>\${user.name}</h3>
      <p>\${user.bio}</p>
    \`;
    membersList.appendChild(div);
  });
}

loadMembers();
