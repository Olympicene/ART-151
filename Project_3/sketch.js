// Written by Dr. Garrett Laroy Johnson
// https://www.garrettlaroyjohnson.com/
let vanish_point = {
  x: 0,
  y: 0,
}

let horizon_height;

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  vanish_point.x = width/2;
  vanish_point.y = height/4

  horizon_height = height - (4/5 * (height-vanish_point.y))
}

function draw() {
  background("purple");
  draw_v_lines()
  draw_horizon()
  draw_sun()
}

function draw_sun() {
  fill(0, 0, 0)

  line(0, horizon_height, width, horizon_height)

  circle(vanish_point.x, horizon_height, height/2)
  
  draw_h_lines()
}

function draw_horizon() {
  fill(255,255,255)
  rectMode(CORNERS)
  // rect(0, horizon_height, width, 0)
}

let gap = 100;
function draw_v_lines() {
  fill(0, 0, 0)
  for(i = -2*width; i < 2*width + width; i += gap) {
    // line(i, height, vanish_point.x, vanish_point.y)
      line(i, height, vanish_point.x + ((horizon_height - vanish_point.y) / (height-horizon_height)  * (i - vanish_point.x)), horizon_height)
  }
}

function draw_h_lines() {
  let horizon = height - (4/5 * (height-vanish_point.y))

  for (i = 1; i < height; i *= 1.2) {
    line(0, i + horizon, width, i + horizon)

  }

}