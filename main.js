import { startGame, endGame, newGame } from "./game.js";

let startScreen;
let gameScreen;

window.onload = function() {
  startScreen = document.getElementById("start-screen");
  gameScreen = document.getElementById("game-screen");

  const vsPCBtn = document.getElementById("vs-pc");
  const vs2PBtn = document.getElementById("2p-vs");

  const pauseBtn = document.getElementById("pause");
  const quitBtn = document.getElementById("quit");
  const restartBtn = document.getElementById("restart");

  vsPCBtn.addEventListener('click', function() {
    toggleMode();
    startGame(1);
  })

  vs2PBtn.addEventListener('click', function() {
    toggleMode();
    startGame(2);
  })

  quitBtn.addEventListener('click',function() {
    toggleMode();
    endGame();
  })

  restartBtn.addEventListener('click', function() {
    newGame();
  })
}

function toggleMode() {
  if (startScreen.style.display !== "none") {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
  } else {
    startScreen.style.display = "flex";
    gameScreen.style.display = "none";
  }
}