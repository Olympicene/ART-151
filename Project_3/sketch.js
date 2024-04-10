// Written by Dr. Garrett Laroy Johnson
// https://www.garrettlaroyjohnson.com/
let vanish_point = {}
let stars = []
let buildings = []
let horizon_height
let song
let playing = false
let oldVals = [];
let button_positions = []
let button_weight = []
let button_colors = []


let ownFrames = 0;
let mapping = {}


// ML5
let facemesh;
let video;
let predictions = [];
face = {}

const options = {
  flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
  maxContinuousChecks: 5, // How many frames to go without running the bounding box detector. Only relevant if maxFaces > 1. Defaults to 5.
  detectionConfidence: 0.9, // Threshold for discarding a prediction. Defaults to 0.9.
  maxFaces: 1, // The maximum number of faces detected in the input. Should be set to the minimum number for performance. Defaults to 10.
  scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75.
  iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
}


function preload() {
  song = loadSound('nightcall.mp3')

}

function setup() {
  frameRate(30);

  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);


  vanish_point.x = width / 2;
  vanish_point.y = height / 4

  horizon_height = height - (4 / 5 * (height - vanish_point.y))

  //setup 
  background("purple");
  generate_stars()
  generate_buildings()
  generate_buttons()
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  fft = new p5.FFT(0.9, 128);
  abs = new BeatStep("Arturia BeatStep MIDI 1");

  // ml5
  video = createCapture(VIDEO);
  facemesh = ml5.facemesh(video, options, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });

  video.hide();

}

function draw() {

  draw_horizon()
  draw_stars()
  draw_sun()
  draw_buildings()
  draw_v_lines()
  draw_h_lines()
  detect_buttons()
  displayTimeBar()

  getKeypoints();
  showNotes();

  if (playing) {
    ownFrames++;
  }

  
}

function showNotes() {
  if(ownFrames in thing) {
    for (lane of thing[ownFrames]) {
      fill(255,255,255)
      circle(button_positions[lane], height-200, 100, 100)
    }
  }
}

/////////////////////////////////////////////////////////// ML stuff
function modelReady() {
  console.log("Model ready!");
}

function getKeypoints() {

  for (let i = 0; i < predictions.length; i += 1) {
    const [nose_x, nose_y] = predictions[i].annotations['midwayBetweenEyes'][0]
    face.x = (nose_x / video.width) - 0.5
    face.y = (nose_y / video.height) - 0.5



    vanish_point.x = width / 2 + (width / 2 * face.x)
    const keypoints = predictions[i].mesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }

  }
}

/////////////////////////////////////////////////////////// Buttons

function generate_buttons() {
  let margin = width / 8
  for (i = margin / 2; i < width; i += margin) {
    button_positions.push(i)
  }

  button_colors = [
    color('#cc0001'),
    color('#fb940b'),
    color('#ffff01'),
    color('#01cc00'),
    color('#03c0c6'),
    color('#0000fe'),
    color('#762ca7'),
    color('#fe98bf'),
  ]

  button_weight = Array(8).fill(5)
}


function detect_buttons() {
  push()
  let eventkey = Array(8).fill(false)
  let weight;
  for (let i = 0; i < 16; i++) {
    if (i == 15)
      print(abs.pads[i])
    if (oldVals[i] !== abs.pads[i]) {

      eventkey[i % 8] = true;
      weight = abs.pads[i]
    }
    oldVals[i] = abs.pads[i];
  }

  for (i in button_positions) {
    let x_pos = button_positions[i]

    button_weight[i] = (button_weight[i] <= 5) ? 5 : button_weight[i] * 0.8
    strokeWeight(button_weight[i])
    stroke(button_colors[i])

    if (button_weight[i] > 5) {
      let x = button_positions[i]
      line(x, height - 100, vanish_point.x + ((horizon_height - vanish_point.y) / (height - horizon_height) * (x - vanish_point.x)), horizon_height)
    }

    if (eventkey[i]) {
      let smash_frame = ownFrames - (ownFrames % 5)
      mapping[smash_frame] = (mapping[smash_frame] || []).concat(i);

      button_weight[i] = (weight < 40) ? 40 : weight
      strokeWeight(button_weight[i])

      eventkey[i % 8] = false;
      //other circle
      circle(x_pos, height - 100, 100)

      // white circle
      fill(255, 255, 255)
      circle(x_pos, height - 100, 100)

    } else {
      fill(255, 255, 255, 0)
      circle(x_pos, height - 100, 100)
    }

  }
  pop()

}

/////////////////////////////////////////////////////////// BUILDINGS
function generate_buildings() {
  build_width = random(80) + 20
  for (i = -(width / 2); i < width + (width / 2); i += build_width) {
    build_width = random(40) + 20

    buildings.push({
      x: i,
      y: horizon_height,
      w: 100,
      h: -((random(10) * 10))
    })
  }
}

function draw_buildings() {
  fill('black')
  rectMode(CORNER)
  noStroke()

  let spectrum, amp, r;
  if (playing) {
    spectrum = fft.analyze();
  }

  for (let i = 0; i < buildings.length; i++) {

    if (playing) {
      r = spectrum[i];
    } else {
      r = 0
    }

    building = buildings[i]
    rect(building.x + (width / 4 * face.x), building.y, building.w, building.h - r / 5)
  }
}

/////////////////////////////////////////////////////////// STARS
function generate_stars() {
  for (i = 0; i < 75; i++) {
    stars.push({
      x: random(width),
      y: random(horizon_height),
      size: random(3),
    })
  }
}

/////////////////////////////////////////////////////////// SUN
function draw_stars() {
  strokeWeight(3)
  stroke(255, 255, 255)
  for (star of stars) {
    circle(star.x, star.y, star.size)
  }
}

function draw_sun() {
  noStroke();
  fill("#fedd74")
  let rms = analyzer.getLevel();

  line(0, horizon_height, width, horizon_height)

  circle((width / 2) + (width / 8 * face.x), horizon_height, (height / 3 * 2) + rms * 200)
  stroke(0, 0, 0)


}

/////////////////////////////////////////////////////////// HORIZON
function draw_horizon() {
  fill('#2f074c')
  noStroke()
  rect(0, 0, width, horizon_height)

  stroke(color(0, 0, 0))

  setGradient(0, horizon_height / 2, width, horizon_height, color('#2f074c'), color(255, 255, 255), Y_AXIS)
}


/////////////////////////////////////////////////////////// LINES
let gap = 100;
function draw_v_lines() {
  fill('#210342')
  rect(0, horizon_height, width, height)

  stroke('#5d6992')
  strokeWeight(3)

  fill(0, 0, 0)
  for (i = -2 * width; i < 2 * width + width; i += gap) {
    // line(i, height, vanish_point.x, vanish_point.y)
    line(i, height, vanish_point.x + ((horizon_height - vanish_point.y) / (height - horizon_height) * (i - vanish_point.x)), horizon_height)
  }
}

function draw_h_lines() {
  strokeWeight(3)
  let horizon = height - (4 / 5 * (height - vanish_point.y))

  for (i = ((frameCount / 20) % 1 + 1); i < height; i *= 1.2) {
    line(0, i + horizon - 1, width, i + horizon)

  }
}


/////////////////////////////////////////////////////////// GRADIENT
const Y_AXIS = 1;
const X_AXIS = 2;

// https://p5js.org/examples/color-linear-gradient.html
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

/////////////////////////////////////////////////////////// PAUSE/PLAY
function togglePlay() {
  if (song.isPlaying()) {
    playing = false
    song.pause();
    console.log(mapping)
  } else {
    song.play()
    playing = true
  }
}

// https://www.youtube.com/watch?v=s7CTmJt0NfI

/////////////////////////////////////////////////////////// TIME BAR
function displayTimeBar() {
  push()

  fill('green')
  noStroke()

  rectMode(CORNERS)
  rect(0, 0, song.currentTime() / song.duration() * width, 10)

  pop()
}

let thing = {
  "260": [
    "0"
  ],
  "265": [
    "1"
  ],
  "275": [
    "2"
  ],
  "280": [
    "3"
  ],
  "290": [
    "4"
  ],
  "295": [
    "5"
  ],
  "305": [
    "6"
  ],
  "315": [
    "7"
  ],
  "320": [
    "6"
  ],
  "330": [
    "3"
  ],
  "340": [
    "2"
  ],
  "345": [
    "1"
  ],
  "355": [
    "0"
  ],
  "360": [
    "1"
  ],
  "370": [
    "2"
  ],
  "375": [
    "0"
  ],
  "390": [
    "2"
  ],
  "395": [
    "1"
  ],
  "410": [
    "3",
    "4",
    "1",
    "6"
  ],
  "425": [
    "2",
    "4",
    "3",
    "5"
  ],
  "440": [
    "2",
    "7",
    "0",
    "5"
  ],
  "455": [
    "3",
    "4",
    "1",
    "6"
  ],
  "470": [
    "2",
    "4",
    "3"
  ],
  "485": [
    "6",
    "1"
  ],
  "490": [
    "5",
    "2"
  ],
  "500": [
    "3",
    "4"
  ],
  "505": [
    "2"
  ],
  "510": [
    "5"
  ],
  "515": [
    "1",
    "6"
  ],
  "525": [
    "7",
    "0"
  ],
  "530": [
    "1"
  ],
  "535": [
    "6"
  ],
  "540": [
    "2",
    "5"
  ],
  "545": [
    "3"
  ],
  "550": [
    "4"
  ],
  "555": [
    "4"
  ],
  "565": [
    "4",
    "2"
  ],
  "570": [
    "5"
  ],
  "580": [
    "2",
    "6"
  ],
  "590": [
    "2",
    "5"
  ],
  "595": [
    "3",
    "4"
  ],
  "605": [
    "5",
    "2"
  ],
  "610": [
    "1",
    "6"
  ],
  "620": [
    "0",
    "5"
  ],
  "625": [
    "1",
    "4"
  ],
  "635": [
    "2",
    "4"
  ],
  "640": [
    "3"
  ],
  "650": [
    "2",
    "6"
  ],
  "655": [
    "1",
    "6"
  ],
  "665": [
    "7",
    "0"
  ],
  "670": [
    "1"
  ],
  "675": [
    "6"
  ],
  "680": [
    "2",
    "5"
  ],
  "690": [
    "3",
    "4"
  ],
  "695": [
    "1",
    "5"
  ],
  "705": [
    "1",
    "6"
  ],
  "710": [
    "2",
    "5"
  ],
  "720": [
    "3",
    "4"
  ],
  "725": [
    "1",
    "5"
  ],
  "735": [
    "0",
    "6"
  ],
  "740": [
    "2"
  ],
  "745": [
    "7"
  ],
  "750": [
    "2",
    "5"
  ]
}