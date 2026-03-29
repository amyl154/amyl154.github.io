const button = document.getElementById("showBioBtn");
const extraBio = document.getElementById("extraBio");
const bgButton = document.getElementById("bgChangeBtn");
const backgrounds = [() => magicpattern(),   // your function that returns a CSS pattern 
() => magicpattern2()];


button.addEventListener("click", function() {
    if (extraBio.style.display === "none") {
        extraBio.style.display = "block";  // show the hidden bio
        button.textContent = "Read Less";  // change button text
    } else {
        extraBio.style.display = "none";   // hide it again
        button.textContent = "Read More";  // change back
    }
});

function magicPattern(bgColor, dotColor = "#ffe4e4") {
  return `url("data:image/svg+xml;utf8,
  <svg viewBox='0 0 200 140' xmlns='http://www.w3.org/2000/svg'>
    <rect width='100%' height='100%' fill='${bgColor}'/>
    <circle cx='20' cy='20' r='5' fill='${dotColor}'/>
    <circle cx='60' cy='20' r='5' fill='${dotColor}'/>
    <circle cx='100' cy='20' r='5' fill='${dotColor}'/>
    <circle cx='140' cy='20' r='5' fill='${dotColor}'/>
    <circle cx='180' cy='20' r='5' fill='${dotColor}'/>
    
    <circle cx='40' cy='60' r='5' fill='${dotColor}'/>
    <circle cx='80' cy='60' r='5' fill='${dotColor}'/>
    <circle cx='120' cy='60' r='5' fill='${dotColor}'/>
    <circle cx='160' cy='60' r='5' fill='${dotColor}'/>
  </svg>")`;
}

document.body.style.backgroundImage = magicPattern("#b9d09d");

/*
let current = 0;

bgButton.addEventListener("click", () => {
    current = (current + 1) % backgrounds.length;
    document.body.style.backgroundImage = backgrounds[current]
});
*/