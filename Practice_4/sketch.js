// let centerX;
// let centerY;

let offset = 0;
let frame = 0;

let body = {
  width: 135,
  height: 220,
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  offset++;
  background(220);

  for (i = 0; i < width/20; i++) {
    // fill(random(255))
    for (j = 0; j < height/20; j++) {
      rect (20 * i, 20 * j, sin(frame) * 10, sin(frame) * 10)
    }
  }
  

  for (i = 0; i < 10; i ++) {
    person((offset + i * 300) % 3000 - body.width - 150, height / 4, frame);
  }

  push();
  translate(width, 0);
  applyMatrix(-1, 0, 0, 1, 0, 0)
  for (i = 0; i < 10; i ++) {

    person((offset + i * 300) % 3000 - body.width, height / 2, frame + 60);
    

  }
  pop();

  for (i = 0; i < 10; i ++) {
    person((offset + i * 300) % 3000 - body.width - 200, 3 * height / 4, frame + 120);
  }


    
  frame++;
}

function person(centerX, centerY, frame) {

  color = sin(frame) * 255
  random()

  // body
  fill(color, 150, 150) // make shirt red
  rectMode(CENTER);
  rect(centerX, centerY, body.width, body.height)

  //left arm
  rectMode(CORNERS)
  let leftArm = {
    X: centerX - body.width / 2,
    Y: centerY - body.height / 2,
    width: 50,
    height: 160,
  }

  push();
  angleMode(DEGREES)
  translate(leftArm.X, leftArm.Y);
  rotate(sin(frame) * 30)
  rect(0, 0, -leftArm.width, leftArm.height)
  pop();

  //right arm
  rectMode(CORNERS)
  let rightArm = {
    X: centerX + body.width / 2,
    Y: centerY - body.height / 2,
    width: 50,
    height: 160,
  }

  push();
  angleMode(DEGREES)
  translate(rightArm.X, rightArm.Y);
  rotate(-sin(frame) * 30)
  rect(0, 0, rightArm.width, rightArm.height)
  pop();


  //left leg
  fill(0, 100, 150)
  rectMode(CORNERS)
  let leftLeg = {
    X: centerX,
    Y: centerY + body.height / 2,
    width: 60,
    height: 160,
  }

  // animateLeg(x1, y1, x2, y2, maxRectHeight, minRectHeight)
  rect(leftLeg.X, leftLeg.Y, leftLeg.X - leftLeg.width, leftLeg.Y + leftLeg.height)

  //right leg
  rectMode(CORNERS)
  let rightLeg = {
    X: centerX,
    Y: centerY + body.height / 2,
    width: 60,
    height: 160,
  }

  rect(rightLeg.X, rightLeg.Y, rightLeg.X + rightLeg.width, rightLeg.Y + rightLeg.height)
  
  //head
  fill(250, 231, 218) //skin tone
  rectMode(CENTER)

  let head = {
    neckHeight: 40,
    X: centerX,
    Y: centerY - body.height / 2,
    width: 100,
    height: 100,
  }

  rect(head.X, head.Y - head.neckHeight, 100, 100)

  //face

  fill(0, 0, 0)
  ellipseMode(RADIUS)
  let face = {
    centerX: head.X,
    centerY: head.Y - head.neckHeight,

    eyeDist: 20,
    eyeRad: 4.5,

    eyebrowOffset: -40,
    eyebrowWidth: 90,
    eyebrowHeight: 40,

    noseWidth: 5,
    noseHeight: 20,

    mouthOffset: 10,
    mouthwidth: 10,
  }

  ellipse(face.centerX - face.eyeDist, face.centerY, face.eyeRad, face.eyeRad)
  ellipse(face.centerX + face.eyeDist, face.centerY, face.eyeRad, face.eyeRad)

  fill('black')
  rectMode(CENTER)
  rect(head.X, face.centerY - face.eyebrowOffset, face.eyebrowWidth, face.eyebrowHeight)

  fill(0, 0, 0)
  noFill();
  beginShape();
  vertex(face.centerX, face.centerY);
  vertex(face.centerX + face.noseWidth, face.centerY + face.noseHeight);
  vertex(face.centerX, face.centerY + face.noseHeight);
  endShape();
}


class animatedWalk {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.growing = true;
    this.rectHeight = 0;
    this.minRectHeight = abs(y2 - y1) * 0.8
    this.maxRectHeight = abs(y2 - y1) * 1.2
    this.easing = 0.1
  }

  update() {
    if (this.growing) {
      this.rectHeight = lerp(this.rectHeight, this.maxRectHeight, this.easing);
      if (abs(this.rectHeight - this.maxRectHeight) < 1) {

        this.rectHeight = this.maxRectHeight;
        this.growing = false;
      }
    } else {
      this.rectHeight = lerp(this.rectHeight, this.minRectHeight, this.easing);
      if (abs(this.rectHeight - this.minRectHeight) < 1) {

        this.rectHeight = this.minRectHeight;
        this.growing = true;
      }
    }

    rect(this.x1, this.y1, this.x2, this.y2 + this.rectHeight);
  }


}