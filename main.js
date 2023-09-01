var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"]
var userClickedPattern = [];
var started = false;
var levelN = 0

$(document).keypress(function () { 
    if(!started) {
        $("#level-title").text("Level "+ levelN);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var clickedColor = $(this).attr("id");
    userClickedPattern.push(clickedColor);
    
    playSound(clickedColor);
    animatePress(clickedColor);
    checkAnswer((userClickedPattern.length)-1);
});

function nextSequence(){
    userClickedPattern = [];
    levelN++;
    $("#level-title").text("Level "+ levelN);
    var rNumber = Math.floor(Math.random()*4);
    var rColor = buttonColors[rNumber];
    gamePattern.push(rColor);
    $("#" + rColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(rColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
}

function checkAnswer(cL){
    if(userClickedPattern[cL] === gamePattern[cL]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }
}

function startOver(){
    levelN = 0;
    started = false;
    gamePattern = [];
}