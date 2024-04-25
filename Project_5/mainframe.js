let gameState = "start";
let choice = "";
let font;
let gameText = "You are in a dark room. There are two buttons in front of you.\n" +
               "Which button do you want to press?\n" +
               ">";

let gameNumber = 0;
let gameTextLeft = ["", 
                    "You chose left.\nYou find yourself in another dark room.\nThere are again two buttons in front of you.\nWhich button do you want to press?\n>",
                    "You chose left again.\nYou find yourself in a narrow hallway.\nAt the end of the hallway, there's a ladder going up.\nDo you climb it?\n>",
                    "You decided to climb the ladder.\nYou emerge onto the roof of a castle.\nThere's a guard patrolling nearby.\nDo you wait for the guard to pass or attempt to sneak past?\n>",
                    "You decided to wait for the guard to pass.\nAfter a few moments, the guard moves away.\nYou have a clear path to the castle entrance.\nDo you proceed?\n>",
                    "You cautiously approach the entrance.\nSuddenly, you hear a voice behind you.\nDo you turn around to face it or continue into the castle?\n>",
                    "You turn around to face the voice.\nIt's an old sage who offers you guidance.\nDo you listen to the sage or ignore their advice?\n>",
                    "You heed the sage's advice and learn about a secret passage into the castle.\nDo you follow the sage's directions or explore on your own?\n>",
                    "You follow the sage's directions and find the secret passage.\nIt leads you directly to the treasure room.\nDo you take the treasure or leave it?\n>",
                    "You leave the treasure room empty-handed.\nFeeling content with your adventure.\nCongratulations, you've completed the game!"];

let gameTextRight = ["", 
                     "You chose right.\nYou find yourself in another dark room.\nThere are again two buttons in front of you.\nWhich button do you want to press?\n>",
                     "You chose right again.\nYou find yourself in a dimly lit corridor.\nThere's a faint sound of water dripping in the distance.\nDo you continue down the corridor?\n>",
                     "You decided to continue down the corridor.\nYou come across a hidden passage leading to a secret chamber.\nDo you investigate the chamber or keep moving?\n>",
                     "You decided to investigate the chamber.\nInside, you find a mysterious artifact.\nDo you take the artifact or leave it?\n>",
                     "You take the artifact with you.\nAs you leave the chamber, you hear footsteps approaching.\nDo you hide or confront whoever is coming?\n>",
                     "You decided to hide.\nThe footsteps pass by, and you're safe.\nYou continue on your journey.\nDo you explore further or head back?\n>",
                     "You explore further and stumble upon a forgotten library.\nDo you search for clues or move on?\n>",
                     "You search the library and find an ancient map.\nDo you follow the map's directions or trust your instincts?\n>",
                     "You follow the map's directions and discover a hidden treasure trove.\nYou collect the treasure and exit the castle, victorious!\nCongratulations, you've completed the game!"];


function preload(){
  font = loadFont("Arcadepix_Plus.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(16);
}

function draw() {
  background(0);
  textFont(font);
  fill(255);
  if (gameState === "start") {
    displayStartScreen();
  } else if (gameState === "playing" && gameNumber < gameTextLeft.length) {
    displayGame();
  } else if (gameNumber >= gameTextLeft.length) {
    displayEndScreen();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (gameState === "start") {
      gameState = "playing";
    } else {

    }
  }
}

function mouseClicked() {
  if (gameState === "playing") {
    gameNumber += 1;
    if (mouseX < (width / 2)) {
      gameText = gameTextLeft[gameNumber]
    } else {
      gameText = gameTextRight[gameNumber]
    }
  }
}

function displayStartScreen() {
  
  textAlign(CENTER, CENTER);
  textSize(64)
  text("Welcome to the Text Adventure Game", width / 2, height / 2);
  textSize(48)
  text("Press ENTER to start", width / 2, height / 2 + 40);
}

function displayGame() {
  textAlign(LEFT, TOP);
  fill(255);
  text(gameText, 20, 20);
}

function displayEndScreen() {
  textAlign(CENTER, CENTER);
  textSize(128)
  text("Congratulations", width / 2, height / 2);
  textSize(48)
  textAlign(CENTER, CENTER);
  text("YOU WIN", width / 2, height / 2 + 60    );
}
