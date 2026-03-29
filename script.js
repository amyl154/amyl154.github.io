const button = document.getElementById("showBioBtn");
const extraBio = document.getElementById("extraBio");
const bgButton = document.getElementById("bgChangeBtn");
const backgrounds = [magicpattern(),   // your function that returns a CSS pattern
  "green"];
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
    // Apply it to the page
    document.body.style.background = backgrounds[current]; // change background
});

