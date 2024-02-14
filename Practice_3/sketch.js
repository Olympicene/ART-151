let cube = {
  rot: {
    angle: 0,
    speed: 5,
  },
  radius: 50,
  x: {
    pos: 0,
    vel: 50,
  },
  y: {
    pos: 0,
    vel: 50,
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
  cube.x.pos = width/2 + random(-100, 100);
  cube.y.pos = height/2 + random(-100, 100);

}

function draw() {
  // balling();
  solar_system()
  
}

function balling(){
  angleMode(DEGREES)
  rectMode(CENTER)
  // background(220)

  fill('red')


  if(cube.x.pos + cube.radius > width || cube.x.pos - cube.radius < 0) {
    cube.x.vel *= -1;
    cube.rot.speed *= -1;
    mySound.play();
  }

  if(cube.y.pos + cube.radius > height || cube.y.pos - cube.radius < 0) {
    cube.y.vel *= -1;
    cube.rot.speed *= -1;
    mySound.play();
  }

  if(cube.y.pos < height/3 * 3) {
    fill('red')
  }

  if(cube.y.pos < height/3 * 2) {
    fill('blue')
  }

  if(cube.y.pos < height/3 * 1) {
    fill('yellow')
  }

  if(cube.y.pos < height/3 * 3 && cube.x.pos < width/2) {
    fill('green')
  }

  if(cube.y.pos < height/3 * 2 && cube.x.pos < width/2) {
    fill('orange')
  }

  if(cube.y.pos < height/3 * 1 && cube.x.pos < width/2) {
    fill('purple')
  }

  push();
  translate(cube.x.pos, cube.y.pos)
  rotate(cube.rot.angle)
  rect(0, 0, cube.radius * 2)
  cube.rot.angle += cube.rot.speed;
  pop();

  cube.x.pos += cube.x.vel;
  cube.y.pos += cube.y.vel;
}

function solar_system() {
    // move x y coords to center
    background(220);
    translate(width/2, height/2);
  
    // change modes
    angleMode(DEGREES);
    rectMode(CENTER);
  

    fill('yellow')
    ellipse(0, 0, 100)
    rotate(ellipseRot);
    
    planet(-100, 100, 'white')
    
    
  
    ellipseRot = ellipseRot + 1;
}

function planet(distance, size, color) {
  translate(0, -distance)
  fill(color)
  ellipse(0, 0, size);
  line(0, 0, 0, distance)
  rotate(ellipseRot)

  if (abs(distance) > 10) {
    planet(distance/1.1, size/1.1, 'white')
  }
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