var buttonColors=["red", "green", "blue", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level=0;

function nextSequence(){

    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);

    randomNumber= Math.floor(Math.random()*4);   
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

$(".btn").on("click",function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");

    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}

function startGame() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}

// Start game on keypress
$(document).on("keypress",function(){
    startGame();
    $("h2").hide();
    $(".grey").hide();  
});

// Start game on button click for mobile users
$(".btn_click").on("click", function () {
    $("#grey").addClass("pressed");
    setTimeout(function(){
        $(".grey").removeClass("pressed");
    },100);
    startGame();
    $("h2").hide();
    $(".grey").hide();    
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }

}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}
