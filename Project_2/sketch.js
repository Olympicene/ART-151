let song;
let sketchWidth;
let sketchHeight;

let isAnimating = false;
let frames = 0;

let planet_1;

function preload() {
  song = loadSound('whispers.mp3')
}

function setup() {
  sketchWidth = document.getElementById("content").offsetWidth;
  sketchHeight = document.getElementById("content").offsetHeight;
  frameRate(30);

  let cnv = createCanvas(sketchWidth, sketchHeight);
  cnv.parent("content");
  cnv.mouseClicked(togglePlay);

  planet_1 = new Planet(width/2, height/2, 1, 0, 150)
  planet_2 = new Planet(width/2, height/2, -1, 0, 150)


}

function windowResized() {
  sketchWidth = document.getElementById("content").offsetWidth;
  sketchHeight = document.getElementById("content").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

class Planet {
  pos = {}
  vel = {}

  constructor(x, y, vx, vy, radius) {
    this.pos.x = x
    this.pos.y = y
    this.vel.x = vx
    this.vel.y = vy
    this.radius = radius
    this.orbit = 1
  }

  planet(distance, size, color) {
    translate(0, -distance)
    fill(color)
    ellipse(0, 0, size);
    rotate(frames)
  }

  display() {
    angleMode(DEGREES);
    translate(this.pos.x, this.pos.y)

    fill(102, 204, 51)
    strokeWeight(10)
    ellipse(0, 0, this.radius * 2)
    rotate(frames * this.orbit)

    push();
    this.planet(300, 150, "#FF3300")
    strokeWeight(0)
    this.planet(150, 50, 'white')
    pop()

    push();
    this.planet(-300, 150, "#FFCC00")
    strokeWeight(0)
    this.planet(-150, 50, 'white')
    pop()
  }

  forward() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  reverse() {
    this.vel.x *= -1;
    this.vel.y *= -1;
  }

  reverse_orbit() {
    this.orbit *= -1
  }


}

let frameDelay = 30;
let circleRadius = 50;

let scene_1 = 170;
let scene_2 = 2050

function draw() {
  background(0, 128, 128, 50)
  fill(0,0,0)
  strokeWeight(10)

  text(frames, width/8, height/8)


  if (isAnimating) {
    if (frames < scene_1) {

      if (frames % 3 == 0) {
        strokeWeight(0)

        // circles slowly fade out
        let see_through = map(scene_1-frames, 0, scene_1, 0, 255)
        fill(255, 255, 255, see_through)

        // Draw a 3 circle at a random position
        for( i = 0; i < 3; i++) {
          scene_1_circles()
        }

      }

      let size = map(scene_1-frames, 0, scene_1, 300, 0)
      fill(102, 204, 51)
      strokeWeight(10)
      ellipse(width/2, height/2, size)

    
    } else if (frames > scene_1) {
      push()
      planet_1.forward()
      planet_1.display()
      pop()

      push()
      planet_2.forward()
      planet_2.display()
      pop()
    }
    
    if (frames == 500) {
      planet_1.reverse()
      planet_2.reverse()
    }

    if (frames > 2100) {
      frames = 0;
    }


    frames++;
  }
}

function scene_1_circles() {
  let x = random(width - circleRadius );
  let y = random(height - circleRadius );
  ellipse(x, y, random(circleRadius *  2));
}



function togglePlay() {
  if (song.isPlaying()) {
    isAnimating = false;
    song.pause();
  } else {
    isAnimating = true
    song.loop()
  }
}

// https://stackoverflow.com/questions/60743491/how-to-position-a-p5-js-canvas-inside-a-div-container