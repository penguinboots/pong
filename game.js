// Board
let board;
let context;
let edgePadding = 20;

// Players

let paddleHeight = 0;
const player1 = {
  x: 0,
  y: 0,
  width: 0,
  height: paddleHeight,
  velocityY: 0
}

const player2 = {
  x: 0,
  y: 0,
  width: 0,
  height: paddleHeight,
  velocityY: 0
}


export function startGame(players) {
  board = document.getElementById("board");
  context = board.getContext("2d");
  
  // Set initial board and player values
  resizeCanvas();
  resizePlayers();
  setInitialPlayerPositions();

  // Adjust canvas, players, ball sizes on window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    resizePlayers();
  });

  requestAnimationFrame(update);
  document.addEventListener("keydown", movePlayer);
  document.addEventListener("keyup", stopPlayer);
}

function resizeCanvas() {
  board.height = window.innerHeight * 0.9;
  board.width = window.innerWidth;
}

function resizePlayers () {
  player1.height = board.height * 0.15;
  player1.width = board.width * 0.02;
  
  player2.height = board.height * 0.15;
  player2.width = board.width * 0.02;

  player2.x = board.width - edgePadding - player2.width;
  paddleHeight = board.height * 0.15;
}

function setInitialPlayerPositions() {
  player1.y = board.height / 2 - player1.height / 2;
  player1.x = edgePadding;

  player2.y = board.height / 2 - player2.height / 2;
  player2.x = board.width - edgePadding - player2.width;
}

function movePlayer(e) {
  // Player 1
  if (e.code === "KeyW") player1.velocityY = -4
  else if (e.code === "KeyS") player1.velocityY = 4;

  // Player 2
  if (e.code === "ArrowUp") player2.velocityY = -4
  else if (e.code === "ArrowDown") player2.velocityY = 4;
}

function stopPlayer(e) {
  if (e.code === "KeyW" || e.code === "KeyS") {
    player1.velocityY = 0;
  }
  if (e.code === "ArrowUp" || e.code === "ArrowDown") {
    player2.velocityY = 0;
  }
}

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  context.fillStyle = "white";

  let newYp1 = player1.y + player1.velocityY;
  if (!outOfBounds(newYp1)) {
    player1.y = newYp1;
  }
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
  

  let newYp2 = player2.y + player2.velocityY;
  if (!outOfBounds(newYp2)) {
    player2.y = newYp2;
  }
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function outOfBounds(yPosition) {
  return (yPosition < 0 || yPosition + paddleHeight > board.height);
}
