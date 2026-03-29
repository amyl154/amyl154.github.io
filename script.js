const button = document.getElementById("showBioBtn");
const extraBio = document.getElementById("extraBio");

button.addEventListener("click", function() {
    if (extraBio.style.display === "none") {
        extraBio.style.display = "block";  // show the hidden bio
        button.textContent = "Read Less";  // change button text
    } else {
        extraBio.style.display = "none";   // hide it again
        button.textContent = "Read More";  // change back
    }
});

function makeSVG(bg, dot) {
  const encoded = encodeURIComponent(
    `<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
  <rect width='100%' height='100%' fill='${bg}'/>
  <circle cx='20' cy='20' r='10' fill='${dot}'/>
  <circle cx='0' cy='0' r='10' fill='${dot}'/>
  <circle cx='40' cy='0' r='10' fill='${dot}'/>
  <circle cx='0' cy='40' r='10' fill='${dot}'/>
  <circle cx='40' cy='40' r='10' fill='${dot}'/>
</svg>`
  );
  return `url("data:image/svg+xml;utf8,${encoded}")`;
}

const bgButton = document.getElementById("bgChangeBtn");
const greenPink = makeSVG('#b9d09d', '#ffdfdf');
const brownPink = makeSVG('#8B6252', '#ffdfdf');
const backgrounds = [greenPink,brownPink];
let current = 0;

bgButton.addEventListener("click", () => {
    current = (current + 1) % backgrounds.length;
    document.body.style.backgroundImage = backgrounds[current]
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = '60px 60px';
});