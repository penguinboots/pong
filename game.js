// Board
let board;
let context;
let edgePadding = 20;

// Players

const player1 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  velocityY: 0
}

const player2 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  velocityY: 0
}


export function startGame() {
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
}

function setInitialPlayerPositions() {
  player1.y = board.height / 2 - player1.height / 2;
  player1.x = edgePadding;

  player2.y = board.height / 2 - player2.height / 2;
  player2.x = board.width - edgePadding - player2.width;
}

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  context.fillStyle = "white";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
}