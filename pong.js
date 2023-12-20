// Board properties
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Players
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
  x: 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY
}

let player2= {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY
}

window.onload = function() {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  requestAnimationFrame(update);
  document.addEventListener("keyup", movePlayer);
}

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height)

  context.fillStyle = "skyblue";

  // Draw Player 1 paddle
  player1.y =+ player1.velocityY;
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  // Draw Player 2 paddle
  player2.y += player2.velocityY;
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function movePlayer(e) {
  // Player 1
  if (e.code == "KeyW") player1.velocityY = -3
  else if (e.code === "KeyS") player1.velocityY = 3;

  // Player 2
  if (e.code == "KeyW") player1.velocityY = -3
  else if (e.code === "KeyS") player1.velocityY = 3;
}