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
  const backgrounds = [makeSVG('#d9e3b7', '#ffdada'), makeSVG('#6d7d7d', '#5f5656')];
  const bgImages    = ['images/button1.png', 'images/button2.png']; 
  const textColors  = ['#30270a', '#fdf6d4'];                       
  const textShadows = ['2px 5px rgb(175, 180, 140)', '2px 5px #929c94'];
 
  let current = 0; 

  //swap bg
  function applyTheme(i) {
    Object.assign(document.body.style, {
      backgroundImage: backgrounds[i],
      backgroundRepeat: 'repeat',
      backgroundSize: '60px 60px',
      color: textColors[i]
    });
 
    //swap text themes
    const h1 = document.querySelector('h1');
    h1.style.color = textColors[i];
    h1.style.textShadow = textShadows[i];

    document.querySelectorAll('.sidebar-links a').forEach(link => {
    link.style.color = textColors[i];
    });
 
    // swap button theme
    bgButton.src = bgImages[i];
  }
 
  // apply the default theme
  applyTheme(0);
 
  // when the button is clicked, switch
  bgButton.addEventListener("click", () => applyTheme(current = (current + 1) % backgrounds.length));
 
});
 