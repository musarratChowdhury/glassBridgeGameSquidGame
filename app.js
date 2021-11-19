// Selectors
var glassTiles = document.querySelectorAll(".glass-tile");
var timer = document.getElementById("timer");
var livesCount = document.querySelector(".lives-count");
var player = document.querySelector(".player-icon");
var startPosition = document.querySelector(".player-start-position");
var instruction = document.getElementById("instruction-text");
var gameoverScreen = document.querySelector(".gameover-screen");
var gameoverText = document.querySelector(".gameover-text");
var gameBody = document.querySelector(".game-body");
var restartBtn = document.getElementById("restart-btn");
var endPosition = document.querySelector(".player-end-position");
var endPositionHolder = document.querySelector(".end-position");
var startBtn = document.getElementById("start-btn");
var audioBtn = document.getElementById("audio-btn");

//background Music
var backgroundMusic = document.createElement("audio");
backgroundMusic.src = "./assets/bgm.mp3";
backgroundMusic.volume = 0.5;
//Global Variables:
var time = 20;
var randomLosingTiles = [];
var totalLife = 3;
var loseLife = false;
var previousTileCleared = true;
var i = 1;
var previousTile;
var playerIcon;
var gameover = false;
var startgame = false;
var interval;
//

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

//generating random losing tiles for the game
randomLosingTiles = ComputerGenerateRandomTiles(SetofTiles);

//computer generating random tile numbers to lose
function ComputerGenerateRandomTiles(SetofTiles) {
  var Tiles = [];

  for (var set in SetofTiles) {
    Tiles.push(getRandom(SetofTiles[set][0], SetofTiles[set][1]));
  }

  return Tiles;
}

//basic functionalities

//audiobutton control
audioBtn.addEventListener("click", () => {
  if (audioBtn.classList.contains("fa-volume-up")) {
    audioBtn.classList.add("fa-volume-mute");
    audioBtn.classList.remove("fa-volume-up");
    backgroundMusic.pause();
  } else {
    audioBtn.classList.remove("fa-volume-mute");
    audioBtn.classList.add("fa-volume-up");
    backgroundMusic.play();
  }
});
//start button control
startBtn.addEventListener("mousedown", () => {
  backgroundMusic.play();
  startgame = true;
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      timer.innerText = `Time : ${time}sec`;
      if (time == 0) {
        gameOver();
      }
    }
  }, 1000);
});
//once the game started
glassTiles.forEach((tile) => {
  tile.addEventListener("mousedown", () => {
    //checking if startgame button was pressed
    if (!startgame) {
      return (instruction.innerText = "Press the start game button!");
    }
    // checking if the previous tile set was cleared
    if (
      SetofTiles[i][0] == tile.dataset.value ||
      SetofTiles[i][1] == tile.dataset.value
    ) {
      // console.log("previous tile set was cleared");
      previousTileCleared = true;
      //removing the player icon from the previous tile
      if (i != 1) previousTile.removeChild(player);
      // checking if it is a losing tile
      randomLosingTiles.forEach((losingTile) => {
        if (tile.dataset.value == losingTile) {
          loseLife = true;

          // console.log("lives - 1");
        }
      });
      return;
    }
    if (tile.dataset.value) {
      instruction.innerText = "previous tile set was not cleared! ";
      previousTileCleared = false;
      return;
    }

    //
  });
});

glassTiles.forEach((tile) => {
  tile.addEventListener("mouseup", () => {
    //checking if startgame button was pressed
    if (!startgame) return;
    if (!previousTileCleared) return;
    if (loseLife) {
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
        // console.log("gameover");
        gameOver();
      }
      //
    } else {
      //if the player stepped into the correct tile then i++
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
//To win the game
endPosition.addEventListener("click", () => {
  if (i >= 8 && !gameover) {
    endPosition.removeChild(endPositionHolder);
    endPosition.appendChild(player);
    winGame();
  }
});
//
//Helper Functions::

function getRandom(min, max) {
  max++; //since the max value is not included
  return Math.floor(Math.random() * (max - min)) + min;
}
function movePlayer(tile) {
  tile.appendChild(player);
  previousTile = tile;
}
function gameOver() {
  gameBody.classList.add("hide");
  gameoverScreen.classList.remove("hide");
  clearInterval(interval);
  backgroundMusic.pause();
}
function winGame() {
  gameBody.classList.add("hide");
  gameoverText.innerText = "You Won!";
  gameoverScreen.classList.remove("hide");
}
