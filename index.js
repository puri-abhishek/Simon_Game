var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

function nextSequence() {
  userClickedPattern = [];
  var randNum = Math.round(Math.random() * 3);
  var randChosenCol = buttonColors[randNum];
  gamePattern.push(randChosenCol);
  $("#" + randChosenCol).fadeIn(150).fadeOut(150).fadeIn(150);
  level++;
  $("#level-title").text("Level " + level);
  playSound(randChosenCol);
}

$(".btn").click(function() {
  var userChosenCol = $(this).attr("id");
  userClickedPattern.push(userChosenCol);
  console.log(userClickedPattern);
  playSound(userChosenCol);
  animatePress(userChosenCol);
  checkAns(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currCol) {
  $("#" + currCol).addClass("on_press");
  //  $(".btn").click(function(){
  //  $(this).addClass("on_press")
  //  });
  setTimeout(function() {
    $("#" + currCol).removeClass("on_press");
  }, 150);
}

$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("LEVEL" + level);
    nextSequence();
    start = true;
  }
});

function checkAns(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");


    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("GAME OVER , Press Any Key to Restart")
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
