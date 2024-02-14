let centerX;
let centerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  [centerX, centerY] = [width/2, height/2]
}

function draw() {
  background(220);

  let body = {
    width:140,
    height: 220,
  }

  // body
  fill(200, 0, 0) // make shirt red
  rectMode(CENTER);
  rect(centerX, centerY, body.width, body.height)

  //left arm
  rectMode(CORNERS)
  let leftArm = {
    X: centerX-body.width/2,
    Y: centerY-body.height/2,
    width: 50,
    height: 160,
  }

  rect(leftArm.X, leftArm.Y, leftArm.X - leftArm.width, leftArm.Y + leftArm.height)

  //right arm
  rectMode(CORNERS)
  let rightArm = {
    X: centerX+body.width/2,
    Y: centerY-body.height/2,
    width: 50,
    height: 160,
  }

  rect(rightArm.X, rightArm.Y, rightArm.X + rightArm.width, rightArm.Y + rightArm.height)

  //left leg
  fill(0, 100, 150)
  rectMode(CORNERS)
  let leftLeg = {
    X: centerX,
    Y: centerY+body.height/2,
    width: 60,
    height: 180,
  }

  rect(leftLeg.X, leftLeg.Y, leftLeg.X - leftLeg.width, leftLeg.Y + leftLeg.height)

  //right leg
  rectMode(CORNERS)
  let rightLeg = {
    X: centerX,
    Y: centerY+body.height/2,
    width: 60,
    height: 180,
  }

  rect(rightLeg.X, rightLeg.Y, rightLeg.X + rightLeg.width, rightLeg.Y + rightLeg.height)
  
  //head
  fill(250,231,218) //skin tone
  rectMode(CENTER)

  let head = {
    neckHeight: 40,
    X: centerX,
    Y: centerY-body.height/2,
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
    eyeRad: 6,

    eyebrowOffset: 10,
    eyebrowWidth: 60,
    eyebrowHeight: 5,

    noseWidth: 5,
    noseHeight: 20,

    mouthOffset: 10,
    mouthwidth: 10,
  }

  ellipse(face.centerX - face.eyeDist, face.centerY, face.eyeRad, face.eyeRad)
  ellipse(face.centerX + face.eyeDist, face.centerY, face.eyeRad, face.eyeRad)

  fill (144,84,47)
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
