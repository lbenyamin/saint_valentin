/***********************
 * PAGE ACCUEIL
 ***********************/
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const photos = document.querySelector(".photos");

const homePage = document.getElementById("home");
const questionPage = document.getElementById("questions");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

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
    showQuestion();
  }, 1300);
});

/***********************
 * ÉTAT INTERNE
 ***********************/
const state = {
  context: null,       // interieur / exterieur
  timing: null,        // jourJ / pasJourJ
  place: null,         // moi / elle / brasserie / gastro / aVolonte
  dinnerScale: null,   // normal / gros
  chef: null,          // moi / elle
  romance: null,       // intense / discussion
  activity: null,      // role / detective / sexy / chill
  after: null,         // theatre / boite / chill / rien
  gift: null,          // gros / petit / aucun
  idea: ""
};

/***********************
 * QUESTIONS
 ***********************/
const questions = [
  {
    text: "🌙 Pour cette soirée, tu nous imagines plutôt…",
    choices: [
      { label: "🕯️ Dans un cocon, rien que nous", action: () => state.context = "interieur" },
      { label: "🌃 Sortir, bouger, voir du monde", action: () => state.context = "exterieur" }
    ]
  },
  {
    text: "📅 On fête ça quand ?",
    choices: [
      { label: "💘 Le jour exact de la Saint-Valentin", action: () => state.timing = "jourJ" },
      { label: "😌 Un autre jour, tranquille", action: () => state.timing = "pasJourJ" }
    ]
  },
  {
    condition: () => state.context === "interieur",
    text: "🏡 On se retrouve où pour commencer la soirée ?",
    choices: [
      { label: "Chez toi", action: () => state.place = "elle" },
      { label: "Chez moi", action: () => state.place = "moi" },
      { label: "À distance, mais avec amour 💻", action: () => state.place = "visio" }
    ]
  },
  {
    condition: () => state.context === "exterieur",
    text: "🍽️ Tu préfères un endroit plutôt…",
    choices: [
      { label: "Simple et chaleureux", action: () => state.place = "brasserie" },
      { label: "Qui marque vraiment le coup", action: () => state.place = "gastro" },
      { label: "Sans prise de tête, on profite", action: () => state.place = "aVolonte" }
    ]
  },
  {
    condition: () => state.context === "interieur",
    text: "🍝 Le dîner, on le veut comment ?",
    choices: [
      { label: "Juste ce qu’il faut", action: () => state.dinnerScale = "normal" },
      { label: "Un vrai moment à part entière", action: () => state.dinnerScale = "gros" }
    ]
  },
  {
    condition: () => state.context === "interieur",
    text: "👨‍🍳 Qui met le tablier ?",
    choices: [
      { label: "Toi 😏", action: () => state.chef = "elle" },
      { label: "Moi 😎", action: () => state.chef = "moi" }
    ]
  },
  {
    text: "💕 L’ambiance idéale pour toi ?",
    choices: [
      { label: "Intense et un peu fou", action: () => state.romance = "intense" },
      { label: "Doux et complice", action: () => state.romance = "discussion" }
    ]
  },
  {
    text: "🧠 Ce qui te ferait le plus sourire après le dîner…",
    choices: [
      { label: "Imprevisible...", action: () => state.activity = "sexy" },
      { label: "Joueur", action: () => state.activity = state.romance === "intense" ? "role" : "detective" },
      { label: "Tranquille, on prend le temps", action: () => state.activity = "chill" }
    ]
  },
  {
    condition: () => state.context === "exterieur",
    text: "🌙 Et quand la nuit continue…",
    choices: [
      { label: "On prolonge dehors", action: () => state.after = "boite" },
      { label: "On rentre tranquillement", action: () => state.after = "chill" },
      { label: "Activite exterieur", action: () => state.after = "theatre" }
    ]
  },
  {
    text: "🎁 Un petit plus pour accompagner la soirée ?",
    choices: [
      { label: "Un truc qui marque vraiment le coup", action: () => state.gift = "gros" },
      { label: "Un truc qui fait juste sourire", action: () => state.gift = "petit" },
      { label: "Non, le moment suffit", action: () => state.gift = "aucun" }
    ]
  },
  {
    text: "📵 On se coupe du monde ?",
    choices: [
      { label: "Oui, zéro téléphone", action: () => {} }
    ]
  },
  {
    text: "✍️ Si tu ajoutes une touche perso à la soirée…",
    input: true
  }
];

let index = 0;

/***********************
 * AFFICHAGE QUESTIONS
 ***********************/
function showQuestion() {
  answersEl.innerHTML = "";

  while (questions[index].condition && !questions[index].condition()) {
    index++;
  }

  const q = questions[index];
  questionEl.textContent = q.text;

  if (q.input) {
    const input = document.createElement("input");
    input.placeholder = "Écris ici 💕";
    input.onchange = () => {
      state.idea = input.value;
      showResult();
    };
    answersEl.appendChild(input);
  } else {
    q.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.label;
      btn.onclick = () => {
        choice.action();
        index++;
        showQuestion();
      };
      answersEl.appendChild(btn);
    });
  }
}

/***********************
 * RÉSULTAT FINAL
 ***********************/
function showResult() {
  questionEl.textContent = "💘 Voilà notre Saint-Valentin 💘";
  answersEl.innerHTML = "";

  let text = "";

  if (state.context === "interieur") {
    text += `On commencera par un dîner ${state.dinnerScale === "gros" ? "généreux et mémorable" : "tout en douceur"} `;
    text += `chez ${state.place === "moi" ? "moi" : "toi"}, `;
    text += state.activity === "detective" ? "avec un jeu plein de mystère, " :
            state.activity === "role" ? "avec une activité où on se mettra dans la peau de personnages, " :
            state.activity === "sexy" ? "dans une ambiance sexy de A à Z, " :
            "en mode chill absolu, ";
  } else {
    text += "On ira dîner dehors, ";
    text += state.place === "gastro" ? "dans un restaurant gastronomique, " :
            state.place === "aVolonte" ? "dans un resto à volonté sans pression, " :
            "dans une petite brasserie pleine de charme, ";
    if (state.after === "theatre") text += "avant d’enchaîner avec une sortie culturelle, ";
    if (state.after === "boite") text += "avant de finir la nuit en boîte, ";
  }

  if (state.gift === "gros") text += "avec un cadeau qui ne passera pas inaperçu, ";
  if (state.gift === "petit") text += "avec un petit cadeau plein d’attention, ";

  if (state.idea) text += `et ta petite touche perso : "${state.idea}".`;

  const p = document.createElement("p");
  p.textContent = text;
  p.style.color = "#ff4d6d";
  p.style.fontSize = "1.3em";
  answersEl.appendChild(p);

  const gif = document.createElement("img");
  gif.src = "https://media.giphy.com/media/W7EJotgttgL6w/giphy.gif";
  gif.style.width = "260px";
  gif.style.marginTop = "25px";
  gif.style.borderRadius = "20px";
  answersEl.appendChild(gif);
}
