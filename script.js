const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const photos = document.querySelector(".photos");

const homePage = document.getElementById("home");
const questionPage = document.getElementById("questions");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

// --- Bouton NON qui fuit ---
function moveNoButton() {
  const container = document.querySelector(".buttons");
  const maxX = container.offsetWidth - noBtn.offsetWidth;
  const maxY = container.offsetHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}

setInterval(moveNoButton, 1000);
noBtn.addEventListener("mouseover", moveNoButton);

// --- Bouton OUI ---
yesBtn.addEventListener("click", () => {
  photos.classList.add("close");

  setTimeout(() => {
    homePage.classList.remove("active");
    questionPage.classList.add("active");
    showQuestion();
  }, 1300);
});

// --- QUESTIONS ---
const questions = [
  {
    text: "🕯️ On part sur une soirée plutôt…",
    choices: ["Intérieur", "Extérieur"]
  },
  {
    text: "🏡 Où se passe la soirée ?",
    choices: ["Chez moi", "Chez toi", "En visio"]
  },
  {
    text: "💕 Niveau romantisme ?",
    choices: ["Romantique ++", "Romantique discussion"]
  },
  {
    text: "🎁 Un cadeau ?",
    choices: ["Gros cadeau", "Petit cadeau", "Pas de cadeau"]
  },
  {
    text: "👨‍🍳 Qui prépare le dîner ?",
    choices: ["Moi", "Toi"]
  },
  {
    text: "📵 Téléphone autorisé ?",
    choices: ["NON"]
  },
  {
    text: "✍️ Une idée de la soirée parfaite ?",
    input: true
  }
];

// Pour mapping subtil du résultat final
function computeFinal(answers) {
  let [type, lieu, romantisme, cadeau, chef, tel, idee] = answers;

  // Paraphrase subtilement en combinant réponses
  let phrase = `💖 On part pour ${type.toLowerCase()} chez ${lieu.toLowerCase()} avec un romantisme ${romantisme.toLowerCase()}, `;
  phrase += chef === "Moi" ? "je prépare le dîner, " : "tu prépares le dîner, ";
  phrase += cadeau !== "Pas de cadeau" ? `avec un ${cadeau.toLowerCase()} ` : "sans cadeau particulier ";
  phrase += `et on terminera avec ton idée : "${idee}".`;

  return phrase;
}

// --- Gestion dynamique ---
let currentQuestion = 0;
let answers = [];

function showQuestion() {
  answersEl.innerHTML = "";

  const q = questions[currentQuestion];
  questionEl.textContent = q.text;

  if (q.input) {
    const input = document.createElement("input");
    input.placeholder = "Écris ton idée ici 💕";
    input.onchange = () => {
      answers.push(input.value);
      nextQuestion();
    };
    answersEl.appendChild(input);
  } else {
    q.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.onclick = () => {
        answers.push(choice);
        nextQuestion();
      };
      answersEl.appendChild(btn);
    });
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// --- Affichage résultat final ---
function showResult() {
  questionEl.textContent = "💘 Voilà notre Saint-Valentin 💘";
  answersEl.innerHTML = "";

  const p = document.createElement("p");
  p.textContent = computeFinal(answers);
  p.style.fontSize = "1.2em";
  p.style.color = "#ff4d6d";

  answersEl.appendChild(p);
}
