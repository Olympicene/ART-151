let ball = {
  radius: 50,
  x: {
    pos: 0,
    vel: 5,
  },
  y: {
    pos: 0,
    vel: 5,
  }
}

let ellipseRot = 0;
let frames = 360 ;

let mySound;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('vine-boom');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball.x.pos = width/2 + random(-100, 100);
  ball.y.pos = height/2 + random(-100, 100);
}

function draw() {
  balling();
  // solar_system()
  
}

function balling(){
  background(220)

  fill('red')
  ellipse(ball.x.pos, ball.y.pos, ball.radius * 2)

  if(ball.x.pos + ball.radius > width || ball.x.pos - ball.radius < 0) {
    ball.x.vel *= -1;
    mySound.play();
  }

  if(ball.y.pos + ball.radius > height || ball.y.pos - ball.radius < 0) {
    ball.y.vel *= -1;
    mySound.play();
  }

  ellipse(ball.x, ball.y, 100, 100)

  ball.x.pos += ball.x.vel;
  ball.y.pos += ball.y.vel;
}

function solar_system() {
    // move x y coords to center
    background(220);
    translate(width/2, height/2);
  
    // change modes
    angleMode(DEGREES);
    rectMode(CENTER);
  
    rotate(ellipseRot);
    
    push();
    fill('yellow')
    ellipse(0, 0, 200)
    
  
    translate(0, -300);
    fill('blue')
    ellipse(0, 0, 100);
    line(0, 0, 0, 300)
  
      push();
      rotate(ellipseRot)
      translate(0, -100);
      line(0, 0, 0, 100)
  
      fill('white')
      ellipse(0, 0, 50, 50);
      
      pop();
    pop();
  
    ellipseRot = ellipseRot + 1;
}

function keyPressed() {
  const options = {
    units: "frames",
    delay: 0,
  }

  if (key == " ") {
    saveGif("thing.gif", frames, options)
  }
}