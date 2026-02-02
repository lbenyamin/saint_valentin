const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const photos = document.querySelector(".photos");

const homePage = document.getElementById("home");
const questionPage = document.getElementById("questions");

// Bouton NON qui fuit
function moveNoButton() {
  const container = document.querySelector(".buttons");
  const maxX = container.offsetWidth - noBtn.offsetWidth;
  const maxY = container.offsetHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}

setInterval(moveNoButton, 1000);
noBtn.addEventListener("mouseover", moveNoButton);

// Bouton OUI
yesBtn.addEventListener("click", () => {
  photos.classList.add("close");

  setTimeout(() => {
    homePage.classList.remove("active");
    questionPage.classList.add("active");
  }, 1300);
});
