// Board properties
let board;
const boardWidth = 500;
const boardHeight = 500;
let context;

// Players
const playerWidth = 10;
const playerHeight = 50;
const playerVelocityY = 0;

const player1 = {
  x: 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY
}

const player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY
}

// Ball
const ballWidth = 10;
const ballHeight = 10;
let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: 1,
  velocityY: 2,
}

// Scores
let p1Score = 0;
let p2Score = 0;

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
  context.clearRect(0, 0, board.width, board.height);

  context.fillStyle = "skyblue";

  //////////////////
  // PLAYER 1
  // Boundary check
  let newYp1 = player1.y + player1.velocityY;
  if (!outOfBounds(newYp1)) {
    player1.y = newYp1;
  }
  // Draw paddle
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //////////////////
  // PLAYER 2
  // Boundary check
  let newYp2 = player2.y + player2.velocityY;
  if (!outOfBounds(newYp2)) {
    player2.y = newYp2;
  }
  // Draw paddle
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  //////////////////
  // BALL
  context.fillStyle = "white";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height)
  // Boundary check (top and bottom), reverse direction
  if (ball.y <= 0 || (ball.y + ball.height) >= boardHeight) {
    ball.velocityY *= -1;
  }
  // Collision check (paddles), reverse direction
  if (detectCollision(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
      ball.velocityX *= -1;
    }
  }
  else if (detectCollision(ball, player2)) {
    if (ball.x + ballWidth >= player2.x) {
      ball.velocityX *= -1;
    }
  }

  // End of round
  if (ball.x < 0) {
    p2Score++;
  } else if (ball.x + ballWidth > boardWidth) {
    p1Score++;
  }

  // Score
  context.font = "45px sans-serif";
  context.fillText(p1Score, boardWidth/5, 45);
  context.fillText(p2Score, boardWidth*4/5 -45, 45)
}

function outOfBounds(yPosition) {
  return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
  // Player 1
  if (e.code == "KeyW") player1.velocityY = -3
  else if (e.code === "KeyS") player1.velocityY = 3;

  // Player 2
  if (e.code == "ArrowUp") player2.velocityY = -3
  else if (e.code === "ArrowDown") player2.velocityY = 3;
}

function detectCollision(a, b) {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
}