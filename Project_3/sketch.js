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
let button_colors = []


function preload() {
  song = loadSound('nightcall.mp3')

}

function setup() {
  frameRate(20);

  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);

  vanish_point.x = width/2;
  vanish_point.y = height/4

  horizon_height = height - (4/5 * (height-vanish_point.y))

  //setup 
  background("purple");
  generate_stars()
  generate_buildings()
  generate_buttons()
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  fft = new p5.FFT(0.9, 128);
  abs = new BeatStep("Arturia BeatStep MIDI 1");

}

function draw() {
  
  draw_horizon()
  draw_stars()


  // drawingContext.filter = 'blur(2px)';
  draw_sun()
  // drawingContext.filter = 'blsur(0px)';

  draw_buildings()


  draw_v_lines()
  draw_h_lines()

  detect_buttons()
}

function generate_buttons() {
  let margin = width/8
  for(i = margin/2; i < width; i += margin) {
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
}


function detect_buttons() {
  let event = false;
  let eventkey;
  let weight;
  for (let i = 0; i < 16; i++) {
    if(i == 15)
      print(abs.pads[i])
    if (oldVals[i] !== abs.pads[i]) {
      event = true;
      eventkey = i%8;
      weight = abs.pads[i]
    }
    oldVals[i] = abs.pads[i];
  }

  for(i in button_positions) {
    let x_pos = button_positions[i]

    strokeWeight(5)
    stroke(button_colors[i])

    if (event == true && i == eventkey) {
      strokeWeight(weight)
      let x = button_positions[i]
      line(x, height-100, vanish_point.x + ((horizon_height - vanish_point.y) / (height-horizon_height)  * (x - vanish_point.x)), horizon_height)


      fill(255,255,255)
      event = false
    } else {
      fill(255,255,255,0)
    }
    circle(x_pos, height-100, 100)
  }
}

/////////////////////////////////////////////////////////// BUILDINGS
function generate_buildings() {
  build_width = random(80) + 20
  for(i = -10; i < width; i += build_width) {
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

  for(let i = 0; i < buildings.length; i++) {

    if (playing) {
      r = spectrum[i];
    } else {
      r = 0
    }

    building = buildings[i]
    rect(building.x, building.y, building.w, building.h - r/5)
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

  circle(vanish_point.x, horizon_height, (height/3 * 2) + rms * 200)
  stroke(0,0,0)


}

/////////////////////////////////////////////////////////// HORIZON
function draw_horizon() {
  fill('#2f074c')
  noStroke()
  rect(0,0, width, horizon_height)
  setGradient(0, horizon_height/2, width, horizon_height, color('#2f074c'), color(255,255,255), Y_AXIS)
  stroke(color(0,0,0))
}


/////////////////////////////////////////////////////////// LINES
let gap = 100;
function draw_v_lines() {
  fill('#210342')
  rect(0, horizon_height, width, height)

  stroke('#5d6992')
  strokeWeight(3)

  fill(0, 0, 0)
  for(i = -2*width; i < 2*width + width; i += gap) {
    // line(i, height, vanish_point.x, vanish_point.y)
      line(i, height, vanish_point.x + ((horizon_height - vanish_point.y) / (height-horizon_height)  * (i - vanish_point.x)), horizon_height)
  }
}

function draw_h_lines() {
  strokeWeight(3)
  let horizon = height - (4/5 * (height-vanish_point.y))

  for (i = ((frameCount/20)%1 + 1); i < height; i *= 1.2) {
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
  } else {
    song.loop()
    playing = true    
  }
}

// https://www.youtube.com/watch?v=s7CTmJt0NfI
