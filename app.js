// Selectors
var glassTiles = document.querySelectorAll(".glass-tile");
var timer = document.getElementById("timer");
var livesCount = document.querySelector(".lives-count");
var player = document.querySelector(".player-icon");
var startPosition = document.querySelector(".player-start-position");
var instruction = document.getElementById("instruction-text");
var gameoverScreen = document.querySelector(".gameover-screen");
var gameBody = document.querySelector(".game-body");
var restartBtn = document.getElementById("restart-btn");
//global variables
var time = 20;
var randomLosingTiles = [];
var totalLife = 3;
var loseLife = false;
var previousTileCleared = true;
var i = 1;
var previousTile;
var playerIcon;
var gameover = false;

//timer for the game
setInterval(() => {
  if (time > 0) {
    time--;
    timer.innerText = `Time : ${time}sec`;
    if (time == 0) {
      console.log("gameover");
      gameOver();
    }
  }
}, 1000);

//set of tiles
var SetofTiles = {
  1: [1, 2],
  2: [3, 4],
  3: [5, 6],
  4: [7, 8],
  5: [9, 10],
  6: [11, 12],
  7: [13, 14],
};
// console.log(SetofTiles[1 + i]);
//generating random losing tiles for the game
randomLosingTiles = ComputerGenerateRandomTiles(SetofTiles);
console.log(randomLosingTiles);
//computer generating random tile numbers to lose
function ComputerGenerateRandomTiles(SetofTiles) {
  var Tiles = [];

  for (var set in SetofTiles) {
    Tiles.push(getRandom(SetofTiles[set][0], SetofTiles[set][1]));
  }

  return Tiles;
}

//basic functionalities
//once the game started
glassTiles.forEach((tile) => {
  tile.addEventListener("mousedown", () => {
    // checking if the previous tile set was cleared

    if (
      SetofTiles[i][0] == tile.dataset.value ||
      SetofTiles[i][1] == tile.dataset.value
    ) {
      console.log("previous tile set was cleared");
      previousTileCleared = true;
      if (i == 1) startPosition.removeChild(player);

      if (i != 1) previousTile.removeChild(player);
      // checking if it is a losing tile
      randomLosingTiles.forEach((losingTile) => {
        if (tile.dataset.value == losingTile) {
          loseLife = true;

          console.log("lives - 1");
        }
      });
      return;
    }
    if (tile.dataset.value) {
      //   console.log("previous tile set not cleared");
      instruction.innerText = "previous tile set was not cleared! ";
      previousTileCleared = false;
      return;
    }

    //
  });
});

glassTiles.forEach((tile) => {
  tile.addEventListener("mouseup", () => {
    if (!previousTileCleared) return;
    if (loseLife) {
      // if life is not 0
      //and time is not 0

      instruction.innerText = "You lost a life!";
      tile.style.backgroundColor = "black";
      startPosition.appendChild(player);
      i = 1;
      totalLife--;
      livesCount.innerText = `Lives left : ${totalLife}`;
      loseLife = false; //resetting the loselife
      tile.dataset.value = null;
      //checking if total life is 0
      if (totalLife == 0) {
        console.log("gameover");
        gameOver();
      }
      //
    } else {
      i++;
      movePlayer(tile);
      //   console.log("go next");
      instruction.innerText = "Move to the next tile!";
    }
  });
});
//to restart the game
restartBtn.addEventListener("click", () => {
  window.location = "./";
});

//helpful functions
function getRandom(min, max) {
  max++; //since the max value is not included
  return Math.floor(Math.random() * (max - min)) + min;
}
function movePlayer(tile) {
  tile.appendChild(player);
  previousTile = tile;
  console.log(i);
  //   console.log(previousTile);
}
function gameOver() {
  gameBody.classList.add("hide");
  gameoverScreen.classList.remove("hide");
}
