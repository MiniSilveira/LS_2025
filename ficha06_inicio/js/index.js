"use strict";
const panelControl = document.querySelector("#panel-control");
const panelGame = document.querySelector("#panel-game");
const btLevel = document.querySelector("#btLevel");
const btPlay = document.querySelector("#btPlay");
const message = document.querySelector("#message");
const infoGame = panelControl.querySelectorAll(".list-item");
const labelGameTime = document.querySelector("#gameTime");
const labelPoints = document.querySelector("#points");
let cards = document.querySelectorAll(".card");
let cardsLogos = [
  "angular",
  "bootstrap",
  "html",
  "javascript",
  "vue",
  "svelte",
  "react",
  "css",
  "backbone",
  "ember",
];

let [flippedCards, totalFlippedCards, totalPoints] = [[], 0, 0];

const nickname = document.getElementById('nickname');
const messageGameOver = document.getElementById("messageGameOver");
const TIMEOUTGAME = 60;
let timer, timerId;

let topGamers = [
  { nickname: 'Ze', points: 331 },
  { nickname: 'Maria', points: 321 }
]
const infoTop = document.getElementById('infoTop');

const gameOver = () => totalFlippedCards === cards.length;

function getTop10() {
  infoTop.textContent = "";
  let newDiv = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  p1.textContent = "Nick Name";
  p2.textContent = "Pontuação";
  newDiv.appendChild(p1);
  newDiv.appendChild(p2);
  infoTop.appendChild(newDiv);
  for (let player of topGamers) {
    let newDivPlayer = newDiv.cloneNode(true);
    newDivPlayer.firstChild.textContent = player.nickname;
    newDivPlayer.lastChild.textContent = player.points;
    infoTop.appendChild(newDivPlayer);
  }
}
btTop.addEventListener("click", getTop10);

function getTopPoints() {
  const pointsTop = document.getElementById('pointsTop');
  if (topGamers.length > 0)
    pointsTop.textContent = topGamers[0].points;
  else
    pointsTop.textContent = 0;
}

function getLastPoints() {
  if (topGamers.length > 0) {
    return topGamers[topGamers.length - 1].points;
  }
  else {
    return 0;
  }
}
function checkTop10() {
  if (topGamers.length < 10)
    return true;

  if (totalPoints > getLastPoints())
    return true;

  return false;
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
function updatePoints(operation = "+") {
  let n = (cards.length - totalFlippedCards) / 2;
  n = n == 0 ? 1 : n;
  totalPoints =
    operation === "+"
      ? totalPoints + timer * n
      : totalPoints < 5
        ? 0
        : totalPoints - 5;
  labelPoints.textContent = totalPoints;
}
function updateGameTime() {
  timer--;
  labelGameTime.textContent = `${timer}s`;
  if (timer === 0) stopGame();
}
function flipCard() {
  this.classList.add("flipped");
  flippedCards.push(this);
  if (flippedCards.length === 2) checkPair();
}
function checkPair() {
  let [card1, card2] = flippedCards;
  if (card1.dataset.logo === card2.dataset.logo) {
    setTimeout(() => {
      card1.classList.add("inactive");
      card2.classList.add("inactive");
      card1.querySelector(".card-front").classList.add("grayscale");
      card2.querySelector(".card-front").classList.add("grayscale");
      totalFlippedCards += 2;
      updatePoints("+");
      if (gameOver()) stopGame();
    }, 500);
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.addEventListener("click", flipCard, { once: true });
      card2.addEventListener("click", flipCard, { once: true });
      updatePoints("-");
    }, 500);
  }
  flippedCards = [];
}

function createPanelGame() {
  let nCards = [6, 12, 20];
  let classPanel = ["intermedio", "avancado"];
  nCards = nCards[btLevel.value - 1];
  panelGame.className = classPanel[btLevel.value - 2] || "";
  let templateCard = document.createElement("div");
  templateCard.innerHTML =
    "<div class='card'><img src='images/ls.png' class='card-back'/><img class='card-front'/></div>";
  panelGame.innerHTML = "";
  templateCard = templateCard.firstChild;
  for (let i = 0; i < nCards; i++)
    panelGame.appendChild(templateCard.cloneNode(true));
  cards = panelGame.children;
}

let showGameInfo = (visible) =>
  visible
    ? infoGame.forEach((e) => e.classList.add("gameStarted"))
    : infoGame.forEach((e) => e.classList.remove("gameStarted"));

function reset() {
  panelGame.style.display = message.classList.remove("hide");

  [btPlay.disabled, message.textContent, panelGame.style.display] = [
    btLevel.value === "0" ? true : false,
    "",
    btLevel.value === "0" ? "none" : "grid",
  ];
  showGameInfo(false);
  createPanelGame();
  [labelGameTime.textContent, labelPoints.textContent] = [`${TIMEOUTGAME}s`, 0];
}

const createAndShuffleCards = (array) => {
  shuffleArray(array);
  array.splice(cards.length / 2, Number.MAX_VALUE);
  array.push(...array);
  shuffleArray(array);
};

function startGame() {

  getTopPoints();
  message.classList.add("hide");
  btLevel.disabled = true;
  btPlay.textContent = "Terminar Jogo";
  showGameInfo(true);
  let [indice, newCardLogos] = [0, [...cardsLogos]];
  createAndShuffleCards(newCardLogos);

  for (let card of cards) {
    let cardFront = card.querySelector(".card-front");
    cardFront.src = `images/${newCardLogos[indice]}.png`;
    card.dataset.logo = newCardLogos[indice++];
    card.addEventListener("click", flipCard, { once: true });
  }
  [flippedCards, totalFlippedCards, totalPoints] = [[], 0, 0];
  [timer, timerId] = [TIMEOUTGAME, setInterval(updateGameTime, 1000)];
  [labelGameTime.textContent, labelPoints.textContent] = [`${timer}s`, 0];
}
function stopGame() {
  [
    btLevel.disabled,
    btPlay.textContent,
    document.querySelector("#messageGameOver").textContent,
  ] = [false, "Iniciar Jogo", `Pontuação:${totalPoints}`];
  clearInterval(timerId);
  modalGameOver.showModal();
  modalGameOver.querySelector("#nickname").style = "display: none;";
  document.querySelector("#messageGameOver").textContent =
    "Pontuação: " + totalPoints;

  if (checkTop10()) {
    nickname.style.display = "block"
    messageGameOver.innerHTML += "<br>Parabéns! Entrou no Top 10!";

  }
  else {
    nickname.style.display = "none"
  }
}

function saveTop10() {
  let name = document.querySelector("inputNick").value;
  let exists = false;
  for (let player of topGamers) { //percorre array a se existe
    if (name === player.nickname) {
      exists = true;
      if (totalPoints > player.points)
        player.points = totalPoints;

    }
  }
  if (!exists) {
    let newPlayer = { nickname: name, points: totalPoints };
    topGamers.push(newPlayer);
  }
  //Ordenar o array através da pontuação dos elementos - decrescente
  topGamers.sort(function (a, b) { return b.points - a.points });

  //garantir que o array no maximo tem 10 elementos
  if (topGamers.length > 10)
    topGamers.pop();


  //guardar dados no local storage
  localStorage.setItem("nickname", name);
  localStorage.setItem("topGamers", JSON.stringify(topGamers));

}
function getLocalStorage() {
  let name = localStorage.getItem("nickname");
  let auxTopGamers = localStorage.getItem("topGamers");
  topGamers = JSON.parse(auxTopGamers) || [];
}


okTop.addEventListener("click", () => {
  saveTop10();
  modalGameOver.close();
  reset();
}
)


btPlay.addEventListener("click", () =>
  btPlay.textContent === "Terminar Jogo" ? stopGame() : startGame()
);
panelGame.addEventListener("click", () => {
  message.textContent = message.textContent ? "" : "Clique em Iniciar o Jogo!";
});
btLevel.addEventListener("change", reset);

reset();
getLocalStorage();