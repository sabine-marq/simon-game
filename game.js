const buttonColours = ["green", "red", "yellow", "blue"];
let gameStarted = false;
const sequenceRandomButtonIndexes = [];
const sequenceClickedButtonIndexes = [];
//once key pressed the game starts
$(".start").click(function () {
    sequenceRandomButtonIndexes.length = 0;
    if (gameStarted === false) {
        addRandomButtonIndex();
    }
    gameStarted = true;
    $(".start").addClass("started");
});
//once button clicked sequence of clicked button stored and compared to the random sequence
$(".btn").click(function () {
    if (gameStarted) {
        for (let i = 0; i < 4; i++) {  // NB: the loop is here not necessary if we used the id of the button clicked via $(this).attr("id")
            if ($(this).hasClass(buttonColours[i])) {
                playSound(buttonColours[i], "pressed");
                addclickedButtonIndex(i);
                if (JSON.stringify(sequenceRandomButtonIndexes) == JSON.stringify(sequenceClickedButtonIndexes)) {
                    setTimeout(addRandomButtonIndex, 500);
                    sequenceClickedButtonIndexes.length = 0;
                }else{
                    for(let j=0;j<sequenceClickedButtonIndexes.length;j++){
                        if(sequenceClickedButtonIndexes[j]!==sequenceRandomButtonIndexes[j]){
                            gameOver();
                        }
                    }
                }
            }
        }
    }
})


function addRandomButtonIndex() {
    let indexColour = Math.round((Math.random() * 3));
    sequenceRandomButtonIndexes.push(indexColour);
    $("h1").text("level " + sequenceRandomButtonIndexes.length);
    let colourName = buttonColours[indexColour];
    playSound(colourName, "random");
}

function addclickedButtonIndex(index) {
    sequenceClickedButtonIndexes.push(index);
    console.log(sequenceClickedButtonIndexes);
}

function playSound(colourName,className) {
    let audio = new Audio("sounds/" + colourName + ".mp3");
    audio.play();
    $("." + colourName).addClass(className);
    // use arrow function here
    setTimeout(() => {
        $("." + colourName).removeClass(className);
    }, 100);
}
function gameOver(){
    $("body").addClass("game-over");
    // use arrow function here
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 100);
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Go to Restart");
    $(".start").removeClass("started");
    sequenceClickedButtonIndexes.length = 0;
    sequenceRandomButtonIndexes.length = 0;
    gameStarted = false;
}