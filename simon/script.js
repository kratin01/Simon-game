
var buttoncolours;
buttoncolours = ["red", "blue", "green", "yellow"];


var gamepatter = [];
var userclickedpattern = [];

var start = false;
var level = 0;

$(document). keypress(function () {
    if (!start) {
        $("#level-title").text("Level" + level);
        nextseq();
        start = true;
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");

    userclickedpattern.push(userChosenColour);
    playsounds(userChosenColour);
    animatepress(userChosenColour);
    checkanswer(userclickedpattern.length - 1);
});

function checkanswer(curretlevel) {
    if (gamepatter[curretlevel] === userclickedpattern[curretlevel]) {
        console.log("Success");
        if (userclickedpattern.length == gamepatter.length)
            setTimeout(function () {
                nextseq();
            }, 1000);

    }
    else {
        console.log("Wrong");
        playsounds("wrong");


        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);


       
        startover();
    }
}


function nextseq() {
    userclickedpattern = [];
    level++;
    $("#level-title").text("level" + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randonchosencolour = buttoncolours[randomnumber];
    gamepatter.push(randonchosencolour);

    $("#" + randonchosencolour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsounds(randonchosencolour)
}

function animatepress(currentcolour) {
    $("#" + currentcolour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentcolour).removeClass("pressed");
    }, 100);
}


function playsounds(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function startover() {
    level = 0;
    gamepatter = [];
    start = false;
}



