window.onload = function() {
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");

  const vsPCBtn = document.getElementById("vs-pc");
  const vs2PBtn = document.getElementById("2p-vs")

  vsPCBtn.addEventListener('click', function() {
    console.log("1P")
  })

  vs2PBtn.addEventListener('click', function() {
    console.log("2P")
  })
}