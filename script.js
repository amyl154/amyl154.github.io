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