let song;
let duration;
let mouseDuration;

function preload() {
  song = loadSound("onTheWayOut.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  duration = song.duration();
  print(duration)
}

function draw() {
  background(220);

  ellipse(mouseX, height/2, 100);
  mouseDuration = map(mouseX, 0, width, 0, duration)
  text('Position', mouseX-20, height/2 -20)
  text(round(mouseDuration,2), mouseX, height/2)
  
}

function mouseClicked() {
  if(song.isPlaying()) {
    song.jump(mouseDuration);
  } else {
    song.play();
  }
}