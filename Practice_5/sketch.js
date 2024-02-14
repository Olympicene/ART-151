let xLoc;
let yLoc;
let ballSpeedX = 3;
let ballSpeedY = 5;
let xLocArray = [50, 100, 150];
let yLocArray = [100, 200, 300];
let widthArray = [20, 50, 100];
let heightArray = [];
let speedXarray = [];

function setup() {
  createCanvas(400, 400);
  xLoc = width / 2;
  yLoc = height / 2;
}

function draw() {
  background(0);
  fill(255, 0, 0);
  ellipse(xLocArray[0], yLocArray[0], widthArray[0]);
  ellipse(xLocArray[1], yLocArray[1], widthArray[1]);
  ellipse(xLocArray[2], yLocArray[2], widthArray[2]);

  xLoc = xLocArray[0];
  yLoc = yLocArray[0];
  moveEllipse();
  bounceEllipse();
}
  
function displayEllipse() {
  ellipse(xLoc, yLoc, 100, 100);
}

function movingEllipse(xpos, ypos, size, colorR, colorG, colorB) {
  fill (colorR, colorG, colorB);
  ellipse(xpos, ypos, size, size);
  //rect(xpos, ypos, 20);
}

function moveEllipse() {
  xLoc += ballSpeedX;
  yLoc += ballSpeedY;
}

function bounceEllipse() {
  if (xLoc < 0 || xLoc > width) {
    ballSpeedX = ballSpeedX * -1;
  }
  if (yLoc < 0 || yLoc > height) {
    ballSpeedY = ballSpeedY * -1;
  }
}