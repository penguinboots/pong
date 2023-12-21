// Board
let board;
let context;
let edgePadding = 20;

// Players
let paddleHeight = 0;
let numOfPlayers = 0;
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

// Ball
const ballWidth = 10;
const ballHeight = 10;
let ball = {
  x: 0,
  y: 0,
  width: ballWidth,
  height: ballHeight,
  velocityX: 1,
  velocityY: 2,
}

let gameInProgress = true;


export function startGame(players) {
  board = document.getElementById("board");
  context = board.getContext("2d");
  numOfPlayers = players;

  // Set initial board and player values
  resizeCanvas();
  resizeGamePieces();
  setInitialGamePiecePositions();

  // Adjust canvas, players, ball sizes on window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    resizeGamePieces();
  });

  gameInProgress = true;
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveViaKeyboard);
  document.addEventListener("keyup", stopViaKeyboard);
}

function resizeCanvas() {
  board.height = window.innerHeight * 0.9;
  board.width = window.innerWidth;
}

function resizeGamePieces() {
  player1.height = board.height * 0.15;
  player1.width = board.width * 0.02;

  player2.height = board.height * 0.15;
  player2.width = board.width * 0.02;

  player2.x = board.width - edgePadding - player2.width;
  paddleHeight = board.height * 0.15;

  ball.height = board.height * 0.05;
  ball.width = ball.height;
}

function setInitialGamePiecePositions() {
  player1.y = board.height / 2 - player1.height / 2;
  player1.x = edgePadding;
  player1.velocityY = 0;

  player2.y = board.height / 2 - player2.height / 2;
  player2.x = board.width - edgePadding - player2.width;
  player2.velocityY = 0;

  ball = {
    ...ball,
    x: board.width / 2,
    y: board.height / 2,
    velocityX: 2,
    velocityY: 4,
  }
}

function moveViaKeyboard(e) {
  if (e.code === "KeyW") player1.velocityY = -5
  else if (e.code === "KeyS") player1.velocityY = 5;

  if (numOfPlayers === 2) {
    if (e.code === "ArrowUp") player2.velocityY = -5
    else if (e.code === "ArrowDown") player2.velocityY = 5;
  }
}

function stopViaKeyboard(e) {
  if (e.code === "KeyW" || e.code === "KeyS") {
    player1.velocityY = 0;
  }
  if (e.code === "ArrowUp" || e.code === "ArrowDown") {
    player2.velocityY = 0;
  }
}


function update() {
  if (gameInProgress) {
    requestAnimationFrame(update);
  }
  console.log(player1.velocityY)
  context.clearRect(0, 0, board.width, board.height);
  context.fillStyle = "white";

  /////////////////////////////////
  // PLAYER 1
  /////////////////////////////////
  //
  // Move player 1 (keyboard)
  moveHumanPlayer(1);
  // Render player 1
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  /////////////////////////////////
  // PLAYER 2
  /////////////////////////////////
  //
  // Move player 2 (computer)
  if (numOfPlayers === 1) {
    moveComputer();
  }
  //
  // Move player 2 (keyboard)
  if (numOfPlayers === 2) {
    moveHumanPlayer(2);
  }
  // Render player 2
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  /////////////////////////////////
  // BALL
  /////////////////////////////////
  //
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height)
  // Boundary check (top and bottom), reverse direction
  if (ball.y <= 0 || (ball.y + ball.height) >= board.height) {
    ball.velocityY *= -1;
  }
}

// Check if paddle is at play boundary
function outOfBounds(yPosition) {
  return (yPosition < 0 || yPosition + paddleHeight > board.height);
}

// Change player position according to velocity and play boundary
function moveHumanPlayer(p) {
  if (p === 1) {
    let newYp1 = player1.y + player1.velocityY;
    if (!outOfBounds(newYp1)) {
      player1.y = newYp1;
    }
  } else if (p === 2) {
    let newYp2 = player2.y + player2.velocityY;
    if (!outOfBounds(newYp2)) {
      player2.y = newYp2;
    }
  }
}

function moveComputer() {

}

export function endGame() {
  gameInProgress = false;
}