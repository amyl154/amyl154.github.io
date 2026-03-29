import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyDyEzt58vY5DsHQE831vxirC-t-qj6xEOw",
  authDomain: "website-24904.firebaseapp.com",
  projectId: "website-24904",
  storageBucket: "website-24904.firebasestorage.app",
  messagingSenderId: "1029690411667",
  appId: "1:1029690411667:web:b8d3d4aba133ac078e9b66",
  measurementId: "G-RMSQ8NVWYV"
};
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
function makeSVG(bg, dot) {
  const encoded = encodeURIComponent(
    `<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}'/>
      <circle cx='20' cy='20' r='5' fill='${dot}'/>
      <circle cx='0' cy='0' r='5' fill='${dot}'/>
      <circle cx='40' cy='0' r='5' fill='${dot}'/>
      <circle cx='0' cy='40' r='5' fill='${dot}'/>
      <circle cx='40' cy='40' r='5' fill='${dot}'/>
    </svg>`
  );
  return `url("data:image/svg+xml;utf8,${encoded}")`;
}
 
document.addEventListener('DOMContentLoaded', () => {
 
  // bio toggle
  const button = document.getElementById("showBioBtn");
  const extraBio = document.getElementById("extraBio");
 
  button.addEventListener("click", function() {
    if (extraBio.style.display === "none") {
      extraBio.style.display = "block";
      button.textContent = "Read Less";
    } else {
      extraBio.style.display = "none";
      button.textContent = "Read More";
    }
  });
 
  // background
  const bgButton = document.getElementById("bgChangeBtn");
  const greenPink = makeSVG('#b9d09d', '#e8caca');
  const blueBrown = makeSVG('#6d7d7d', '#5f5656');
  const backgrounds = [greenPink, blueBrown];
  const bgImages = ['images/starButton.png', 'images/heartButton.png'];
  const textColors = ['#000000', '#ffffff'];
  let current = 0;
 
  const preload1 = new Image();
  const preload2 = new Image();
  preload1.src = bgImages[0];
  preload2.src = bgImages[1];
 
  function applyTheme(i) {
    document.body.style.backgroundImage = backgrounds[i];
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = '60px 60px';
    document.body.style.color = textColors[i];
    document.querySelector('h1').style.color = textColors[i];
    bgButton.src = bgImages[i];
  }
 
  applyTheme(0);
 
  bgButton.addEventListener("click", () => {
    current = (current + 1) % backgrounds.length;
    applyTheme(current);
  });
 
  // guestbook
  const guestbookBtn = document.getElementById('guestbookBtn');
  const guestbookModal = document.getElementById('guestbookModal');
  const closeModal = document.getElementById('closeModal');
  const submitEntry = document.getElementById('submitEntry');
  const entries = document.getElementById('entries');
  let selectedMood = '🌸';
 
  guestbookBtn.addEventListener('click', () => {
    guestbookModal.style.display = 'block';
    loadEntries();
  });
 
  closeModal.addEventListener('click', () => {
    guestbookModal.style.display = 'none';
  });
 
  document.querySelectorAll('.mood').forEach(mood => {
    mood.addEventListener('click', () => {
      document.querySelectorAll('.mood').forEach(m => m.style.opacity = '0.4');
      mood.style.opacity = '1';
      selectedMood = mood.textContent;
    });
  });
 
  submitEntry.addEventListener('click', async () => {
    const name = document.getElementById('guestName').value;
    const message = document.getElementById('guestMessage').value;
 
    if (!name || !message) {
      alert('Please fill in your name and message!');
      return;
    }
 
    await addDoc(collection(db, 'guestbook'), {
      name,
      message,
      mood: selectedMood,
      date: new Date().toLocaleDateString()
    });
 
    document.getElementById('guestName').value = '';
    document.getElementById('guestMessage').value = '';
    loadEntries();
  });
 
  async function loadEntries() {
    entries.innerHTML = '';
    const snapshot = await getDocs(collection(db, 'guestbook'));
    snapshot.forEach(doc => {
      const e = doc.data();
      entries.innerHTML += `
        <div style="border-top: 1px solid #eee; margin-top: 12px; padding-top: 12px;">
          <strong>${e.name}</strong> ${e.mood} <span style="font-size:12px; color:#999;">${e.date}</span>
          <p>${e.message}</p>
        </div>
      `;
    });
  }
 
});