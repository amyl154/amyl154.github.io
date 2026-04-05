import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
 
// firebase configuration
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

// background
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

  const bgButton = document.getElementById("bgChangeBtn");
  const greenPink = makeSVG('#d9e3b7', '#ffdada');
  const blueBrown = makeSVG('#6d7d7d', '#5f5656 ');
  const backgrounds = [greenPink, blueBrown];
  const bgImages = ['images/button1.png', 'images/button2.png'];
  const textColors = ['#30270a', '#fdf6d4'];
  const textShadows=['2px 5px rgb(175, 180, 140)', '2px 5px #929c94']
  const ginghamImages = ['images/side1.jpg', 'images/side2.png'];
  let current = 0;
 
  const preload1 = new Image();
  const preload2 = new Image();
  preload1.src = bgImages[0];
  preload2.src = bgImages[1];

  const modalThemes = [
  { bg: '#f5e6ea', border: '#e8caca', text: '#30270a' }, // green theme
  { bg: '#4a4a4a', border: '#5f5656', text: '#fdf6d4' }, // blue theme
  ];
 
  function applyTheme(i) {
    document.body.style.backgroundImage = backgrounds[i];
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = '60px 60px';
    document.body.style.color = textColors[i];
    const h1 = document.querySelector('h1');
    h1.style.color = textColors[i];
    h1.style.textShadow = textShadows[i];
    bgButton.src = bgImages[i];

    // update modal colors
    const modal = document.getElementById('guestbookModal');
    modal.style.background = modalThemes[i].bg;
    modal.style.color = modalThemes[i].text;
    modal.style.border = `2px solid ${modalThemes[i].border}`;

    // update gingham
    document.querySelectorAll('.ging-left').forEach(el => {
      el.style.backgroundImage = `url('${ginghamImages[i]}')`;
    });
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