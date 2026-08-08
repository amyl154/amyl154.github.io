function makeSVG(bg, dot) {
  const encoded = encodeURIComponent(
    `<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}'/>
      <circle cx='20' cy='20' r='1' fill='${dot}'/>
      <circle cx='0' cy='0' r='1' fill='${dot}'/>
      <circle cx='40' cy='0' r='1' fill='${dot}'/>
      <circle cx='0' cy='40' r='1' fill='${dot}'/>
      <circle cx='40' cy='40' r='1' fill='${dot}'/>
    </svg>`
  );
  return `url("data:image/svg+xml;utf8,${encoded}")`;
}

document.addEventListener('DOMContentLoaded', () => {
 
  const bgButton = document.getElementById("bgChangeBtn");
  const backgrounds = [makeSVG('#d9e3b7', '#ffdada'), makeSVG('#232230','#2c3022')];
  const bgImages    = ['images/lam1.png', 'images/lam2.png']; 
  const textColors  = ['#544334', '#a5b4be'];    
  const textColors1  = ['#877b70', '#6a7880'];                       
  const textShadows = ['2px 5px #afb48c', '2px 5px #494a54'];
  const speakerImages = ['images/spe1.png', 'images/spe2.png'];
 
  let current = 0; 

  //swap bg
  function applyTheme(i) {
    Object.assign(document.body.style, {
      backgroundImage: backgrounds[i],
      backgroundRepeat: 'repeat',
      backgroundSize: '170px 170px',
      color: textColors[i]
    });
 
    //swap text themes
    const h1 = document.querySelector('h1');
    h1.style.color = textColors[i];
    h1.style.textShadow = textShadows[i];

    document.querySelectorAll('.sidebar-links a').forEach(link => {
    link.style.color = textColors1[i];
    });
    document.querySelector('.music').style.backgroundImage = `url('${speakerImages[i]}')`;
    // swap button theme
    bgButton.src = bgImages[i];
  }
 
  // apply the default theme
  applyTheme(0);
 
  // when the button is clicked, switch
  bgButton.addEventListener("click", () => applyTheme(current = (current + 1) % backgrounds.length));
 
  // music
  const aud= document.getElementById('music');
  let isPlaying = false;

  function playPause() {
    if (isPlaying) {
      aud.pause();
    } else {
      aud.play();
    }
    isPlaying = !isPlaying;
  }

  window.playPause = playPause; // bc im using type=module
});
 