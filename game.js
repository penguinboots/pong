/////////////////////////////////////////////////////////////////
/////////////////////////// VARIABLES ///////////////////////////
/////////////////////////////////////////////////////////////////

// Board
let board;
let context;
const edgePadding = 20;

// Players
let paddleHeight;
let numOfPlayers;
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
const ballBaseVelocityX = -2;
const ballBaseVelocityY = 5;
let ball = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  velocityX: ballBaseVelocityX,
  velocityY: ballBaseVelocityY,
}

// Game flow
let gameInProgress = true;
let p1Score = 0;
let p2Score = 0;

// Difficulty scaling, speeds per level
let level = 1;
const speedsX = [0, 2, 4, 6]
const speedsY = [0, 5, 6.25, 7.5]

// FPS control
let lastFrameTime = 0;
const targetFPS = 60;
const frameDuration = 1000 / targetFPS;

/////////////////////////////////////////////////////////////////
///////////////////////////// MAIN //////////////////////////////
/////////////////////////////////////////////////////////////////

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
  requestAnimationFrame(gameLoop);
  document.addEventListener("keydown", setHumanVelocity);
  document.addEventListener("keyup", stopHumanVelocity);
}

function gameLoop(timestamp) {
  if (gameInProgress) {
    requestAnimationFrame(gameLoop);

    // Control FPS for higher hz displays
    const elapsedTime = timestamp - lastFrameTime;
    if (elapsedTime < frameDuration) {
      return;
    }
    lastFrameTime = timestamp - (elapsedTime % frameDuration);
  }

  context.clearRect(0, 0, board.width, board.height);
  context.fillStyle = "white";

  // DRAW MIDDLE LINE
  for (let i = 10; i < board.height; i += 50) {
    context.fillRect(board.width / 2 - 2.5, i, 5, 20);
  }

  // SCORE DISPLAY
  context.font = "45px monospace";
  context.fillText(p1Score, board.width / 5, 95);
  context.fillText(p2Score, board.width * 4 / 5 - 45, 95)

  // PADDLE MOVEMENT
  numOfPlayers === 1 && setComputerVelocity();
  movePaddles();
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  // BALL MOVEMENT
  setBallVelocity();
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // CHECK IF ROUND IS OVER
  roundOverCheck();
}

/////////////////////////////////////////////////////////////////
/////////////////// RESIZERS AND POSITIONERS ////////////////////
/////////////////////////////////////////////////////////////////

// Resize game board on window change
function resizeCanvas() {
  board.height = window.innerHeight * 0.9;
  board.width = window.innerWidth;
}

// Resize paddles and ball on window change
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

// Set initial paddle/ball positions and velocities
function setInitialGamePiecePositions() {
  player1.y = board.height / 2 - player1.height / 2;
  player1.x = edgePadding;
  player1.velocityY = 0;

  player2.y = board.height / 2 - player2.height / 2;
  player2.x = board.width - edgePadding - player2.width;
  player2.velocityY = 0;

  ball = {
    ...ball,
    x: board.width / 2 - ball.width / 2,
    y: board.height / 2 - ball.width / 2,
  }
}

/////////////////////////////////////////////////////////////////
///////////////////////// GAME HELPERS //////////////////////////
/////////////////////////////////////////////////////////////////

// Handler for keydowns, change player velocity (start moving)
function setHumanVelocity(e) {
  if (e.code === "KeyW") player1.velocityY = -5
  else if (e.code === "KeyS") player1.velocityY = 5;
  // only process arrow keys if in 2P mode
  if (numOfPlayers === 2) {
    if (e.code === "ArrowUp") player2.velocityY = -5
    else if (e.code === "ArrowDown") player2.velocityY = 5;
  }
}

// Handler for keyups, change player velocity (stop moving)
function stopHumanVelocity(e) {
  if (e.code === "KeyW" || e.code === "KeyS") {
    player1.velocityY = 0;
  }
  // only process arrow keys if in 2P mode
  if (numOfPlayers === 2) {
    if (e.code === "ArrowUp" || e.code === "ArrowDown") {
      player2.velocityY = 0;
    }
  }
}

// Change computer velocity according to ball position
function setComputerVelocity() {
  const trueBallPosition = { x: ball.x + ball.width / 2, y: ball.y + ball.height / 2 }
  const trueComputerPosition = { y: player2.y + player2.height / 2 }
  const midboardY = board.height / 2;
  const midboardX = board.width / 2;

  // If ball is on P2 side, try to match X position
  if (trueBallPosition.x >= midboardX) {
    trueBallPosition.y > trueComputerPosition.y ?
      player2.velocityY = 5
      :
      player2.velocityY = -5
  }
  // If ball is not on P2 side, return to middle
  if (trueBallPosition.x < midboardX) {
    if (trueComputerPosition.y === midboardY) {
      player2.velocityY = 0;
    } else if (trueComputerPosition.y > midboardY) {
      player2.velocityY = -5;
    } else {
      player2.velocityY = 5;
    }
  }
}

// Change paddle positions according to velocity and play boundary
function movePaddles() {
  let newYp1 = player1.y + player1.velocityY;
  if (!outOfBounds(newYp1)) {
    player1.y = newYp1;
  }

  let newYp2 = player2.y + player2.velocityY;
  if (!outOfBounds(newYp2)) {
    player2.y = newYp2;
  }
}

// Change ball position according to on velocity, collisions, and play boundary
function setBallVelocity() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  // Boundary check (top and bottom), reverse direction
  if (ball.y <= 0 || (ball.y + ball.height) >= board.height) {
    ball.velocityY *= -1;
  }
  // Collision check (paddles), reverse direction
  if (detectCollision(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
      ball.velocityX *= -1;
    }
  }
  else if (detectCollision(ball, player2)) {
    if (ball.x + ball.width >= player2.x) {
      ball.velocityX *= -1;
    }
  }
}

// Ends round if ball out of bounds
function roundOverCheck() {
  if (ball.x < 0) {
    p2Score++;
    setGameLevel();
    newRound(1);
  } else if (ball.x + ball.width > board.width) {
    p1Score++;
    setGameLevel();
    newRound(-1);
  }
}

// Starts new round
function newRound(direction) {
  const { newX, newY } = getBallVelocity(direction);
  ball = {
    ...ball,
    x: board.width / 2 - ball.width / 2,
    y: board.height / 2 - ball.width / 2,
    velocityX: newX,
    velocityY: newY,
  }
  console.log(ball.velocityX, ball.velocityY)
}

// Set game difficulty based on player scores
function setGameLevel() {
  if (numOfPlayers === 1) {
    if (p1Score >= 5) {
      level = 3;
    } else if (p1Score >= 2) {
      level = 2;
    }
  } else if (numOfPlayers === 2) {
    if (p1Score + p2Score >= 5) {
      level = 3;
    } else if (p1Score + p2Score >= 2) {
      level = 2;
    }
  }
}

// Get new ball velocity based on game difficulty
function getBallVelocity(direction) {
  let newVelX = speedsX[level] * direction
  let newVelY = speedsY[level]
  return { x: newVelX, y: newVelY }
}

// Restarts game
export function newGame() {
  p1Score = 0;
  p2Score = 0;
  setInitialGamePiecePositions();
}

// Ends game loop
export function endGame() {
  gameInProgress = false;
}


/////////////////////////////////////////////////////////////////
//////////////////////////// CHECKS /////////////////////////////
/////////////////////////////////////////////////////////////////

// Check if paddle is at play boundary
function outOfBounds(yPosition) {
  return (yPosition < 0 || yPosition + paddleHeight > board.height);
}

// Check if two shapes are touching
function detectCollision(a, b) {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
}
