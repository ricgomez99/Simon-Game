let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let over = false;

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function (event) {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  } else {
    started = false;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    gameOver();
    startOver();
  }
}

function gameOver() {
  over = true;
  if (over) {
    playSound("wrong");
    $("body").addClass("game-over");
  }
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, press any key to Restart");
}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
