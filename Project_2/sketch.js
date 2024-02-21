let song;
let isLoaded = false;

function preload() {
  song = loadSound('tekka.mp3')
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  frameRate(60);
  amplitude = new p5.Amplitude(0.5);
  amplitude.setInput(song);

}


function draw() {
  background(255, 255, 255, 100)
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