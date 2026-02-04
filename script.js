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
  if (!container) return;

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
 * ÉTAT
 ***********************/
const state = {
  context: null,   // interieur / exterieur
  timing: null,    // jourJ / pasJourJ
  place: null,     // moi / elle / brasserie / gastro / aVolonte
  dinnerScale: null,
  chef: null,
  romance: null,   // intense / discussion
  activity: null,  // jeu / sexy / chill
  after: null,     // theatre / boite / chill
  gift: null,      // gros / petit / aucun
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
      { label: "🌃 Sortir, à l'aventure", action: () => state.context = "exterieur" }
    ]
  },
  {
    text: "📅 On fête ça quand ?",
    choices: [
      { label: "💘 Le jour exact", action: () => state.timing = "jourJ" },
      { label: "😌 Un autre jour", action: () => state.timing = "pasJourJ" }
    ]
  },
  {
    condition: () => state.context === "interieur",
    text: "🏡 On se retrouve où ?",
    choices: [
      { label: "Chez toi", action: () => state.place = "elle" },
      { label: "Chez moi", action: () => state.place = "moi" }
    ]
  },
  {
    condition: () => state.context === "exterieur",
    text: "🍽️ Tu préfères quel genre d’endroit ?",
    choices: [
      { label: "Simple et chaleureux", action: () => state.place = "brasserie" },
      { label: "Qui marque vraiment le coup", action: () => state.place = "gastro" },
      { label: "Sans pression, on mange sans compter", action: () => state.place = "aVolonte" }
    ]
  },
  {
    condition: () => state.context === "interieur",
    text: "🍝 Le dîner, on le voit comment ?",
    choices: [
      { label: "Juste ce qu’il faut", action: () => state.dinnerScale = "normal" },
      { label: "Un vrai moment fort", action: () => state.dinnerScale = "gros" }
    ]
  },
  {
    condition: () => state.context === "interieur",
    text: "👨‍🍳 Qui cuisine ?",
    choices: [
      { label: "Toi 😏", action: () => state.chef = "elle" },
      { label: "Moi 😎", action: () => state.chef = "moi" }
    ]
  },
  {
    text: "💕 L’ambiance idéale ?",
    choices: [
      { label: "Intense et un peu fou", action: () => state.romance = "intense" },
      { label: "Douce et complice", action: () => state.romance = "discussion" }
    ]
  },
  {
    text: "🧠 Après le dîner, tu préfèrerais…",
    choices: [
      { label: "Un moment imprevisible... 😈", action: () => state.activity = "sexy" },
      { label: "Un jeu à deux", action: () => state.activity = "jeu" },
      { label: "Juste profiter calmement, rien de spé", action: () => state.activity = "chill" }
    ]
  },
  {
    condition: () => state.context === "exterieur",
    text: "🌙 Et la suite de la soirée ?",
    choices: [
      { label: "On prolonge dehors", action: () => state.after = "boite" },
      { label: "Rentrer et prolonger", action: () => state.after = "chill" },
      { label: "Une sortie culturelle", action: () => state.after = "theatre" }
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
    text: "✍️ Une touche perso ?",
    input: true
  }
];

let index = 0;

/***********************
 * AFFICHAGE QUESTIONS
 ***********************/
function showQuestion() {
  answersEl.innerHTML = "";

  while (questions[index]?.condition && !questions[index].condition()) {
    index++;
  }

  if (index >= questions.length) {
    showResult();
    return;
  }

  const q = questions[index];
  questionEl.textContent = q.text;

  if (q.input) {
    const input = document.createElement("input");
    input.placeholder = "Écris ici 💕";

    const btn = document.createElement("button");
    btn.textContent = "Valider 💖";
    btn.onclick = () => {
      state.idea = input.value;
      showResult();
    };

    answersEl.appendChild(input);
    answersEl.appendChild(btn);
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
    text += `On commencera par un dîner ${state.dinnerScale === "gros" ? "généreux" : "tout en douceur"} `;
    text += state.place === "moi" ? "chez Lucas, " : "chez Lola, ";

    if (state.activity === "jeu") {
      text += state.romance === "intense"
        ? "avec un jeu de rôle très immersif, "
        : "avec un jeu de détective plein de mystère, ";
    }
    if (state.activity === "sexy") text += "dans une ambiance sexy de A à Z, ";
    if (state.activity === "chill") text += "en mode chill absolu, ";
  } else {
    text += "On ira dîner dehors, ";
    text += state.place === "gastro"
      ? "dans un restaurant gastronomique, "
      : state.place === "aVolonte"
      ? "dans un resto à volonté, "
      : "dans une petite brasserie, ";

    if (state.after === "theatre") text += "avant d’enchaîner avec une sortie culturelle, ";
    if (state.after === "boite") text += "avant de finir la nuit en boîte, ";

    if (state.after === "chill") {
      text += "puis de rentrer pour prolonger la soirée ";
      if (state.activity === "jeu") text += "avec un jeu complice à deux, ";
      if (state.activity === "sexy") text += "dans une ambiance sexy, ";
      if (state.activity === "chill") text += "en toute simplicité, ";
    }
  }

  if (state.gift === "gros") text += "avec un cadeau inoubliable, ";
  if (state.gift === "petit") text += "avec un petit cadeau plein d’attention, ";

  if (state.idea) text += `et ta touche perso : "${state.idea}".`;

  const p = document.createElement("p");
  p.textContent = text;
  p.style.color = "#ff4d6d";
  p.style.fontSize = "1.3em";
  answersEl.appendChild(p);
}
