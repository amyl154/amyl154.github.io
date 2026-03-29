const button = document.getElementById("showBioBtn");
const extraBio = document.getElementById("extraBio");
const bgButton = document.getElementById("bgChangeBtn");
const backgrounds = [
  "repeating-radial-gradient(circle, #fff7f3 0px, #000000 5px, transparent 5px, transparent 25px)" // dotted pattern// 
  ,"repeating-radial-gradient(circle, #000000 0px, #ffffff 5px, transparent 5px, transparent 25px)"
];
let current = 0;

button.addEventListener("click", function() {
    if (extraBio.style.display === "none") {
        extraBio.style.display = "block";  // show the hidden bio
        button.textContent = "Read Less";  // change button text
    } else {
        extraBio.style.display = "none";   // hide it again
        button.textContent = "Read More";  // change back
    }
});

// list of backgrounds (colors or CSS patterns)
bgButton.addEventListener("click", () => {
  current = (current + 1) % backgrounds.length; // cycle through backgrounds
  document.body.style.background = backgrounds[current]; // change background
});

