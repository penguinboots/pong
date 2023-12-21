window.onload = function() {
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");

  const vsPCBtn = document.getElementById("vs-pc");
  const vs2PBtn = document.getElementById("2p-vs");

  const pauseBtn = document.getElementById("pause");
  const quitBtn = document.getElementById("quit");
  const restartBtn = document.getElementById("restart");

  vsPCBtn.addEventListener('click', function() {
    console.log("1P")
    toggleMode();
  })

  vs2PBtn.addEventListener('click', function() {
    console.log("2P")
    toggleMode();
  })

  quitBtn.addEventListener('click',function() {
    toggleMode();
  })

  function toggleMode() {
    if (startScreen.style.display !== "none") {
      startScreen.style.display = "none";
      gameScreen.style.display = "block";
    } else {
      startScreen.style.display = "flex";
      gameScreen.style.display = "none";
    }
  }
}

