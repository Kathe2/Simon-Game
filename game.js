var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keydown(function () {
    if (!started){
        nextSequence();
        $("h1").text("Level " + level);
        started = true
    };
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); 
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);  
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); 

    playSound(randomChosenColour); 
    animatePress(randomChosenColour);

    userClickedPattern = [];
    level += 1;
    $("h1").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("sucess");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function() {
               nextSequence(); 
            }, 1000);
        }
    }

    else{
        var wAudio = new Audio ("sounds/wrong.mp3");
        wAudio.play();

        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart")

        startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}






