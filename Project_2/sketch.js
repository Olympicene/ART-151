let song;
let isLoaded = false;

let sketchWidth;
let sketchHeight;

function preload() {
  song = loadSound('tekka.mp3')
}

function setup() {
  sketchWidth = document.getElementById("content").offsetWidth;
  sketchHeight = document.getElementById("content").offsetHeight;

  let cnv = createCanvas(sketchWidth, sketchHeight);
  cnv.parent("content");
  cnv.mouseClicked(togglePlay);
  frameRate(60);
  amplitude = new p5.Amplitude(0.5);
  amplitude.setInput(song);

}

function windowResized() {
  sketchWidth = document.getElementById("content").offsetWidth;
  sketchHeight = document.getElementById("content").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

function draw() {
  background(255, 255, 0, 100)
  // fill(255, 255, 255);
  strokeWeight(10)

  let level = amplitude.getLevel();
  let size = map(level, 0, 0.3, 100, 300)

  ellipse(height / 2, width / 2, size);
  text(size, width / 4, height / 4,)
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

// https://stackoverflow.com/questions/60743491/how-to-position-a-p5-js-canvas-inside-a-div-container