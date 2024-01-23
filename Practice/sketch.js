function setup() {
  createCanvas(windowWidth, windowHeight);
  // width, height 
  // origin top left


}

function draw() {
  ///////////////////////////////////////// Setup
  // background(240);
  // range 0-255

  stroke('red')
  // stroke color r, g, b values or 'color'

  ///////////////////////////////////////// Circle
  fill('white')  

  strokeWeight(20)
  // outline of circle

  circle(width/2, height/2, 100)
  // pox, poxy, and radius

  ///////////////////////////////////////// Text
  strokeWeight(5)
  // text outline 

  textSize(30)
  // font size 

  text(mouseX + ", " + mouseY, mouseX, mouseY)
  // text, posx, posy

  ///////////////////////////////////////// Point
  strokeWeight(35)
  // size of point

  point(width/2, height/2)
  //position

  ///////////////////////////////////////// Square
  stroke('black')

  square(width/2 - 50, height/8, 100, 25)
  // origin top left w/ x, y, length and border radius

  ///////////////////////////////////////// Ellipse
  stroke('yellow')
  // noFill()

  ellipse(width/2, height * 14/15, 500, 50)
  // x, y, width, height

  ///////////////////////////////////////// Arbitrary shape
  vertex

  



  // fun stuff
  fun()

}

function extra() {
  // destructuring in javascript
  for (let [x, y] of points) {
    console.log(x, y)
  }

  // mouse pressed
  if (mouseIsPressed) {
    point(mouseX, mouseY)
  }
}

function fun() {
  stroke('red')

  strokeWeight(4)
  textAlign('center')
  text("Buy Target™ or else I will kill you", width/2, height/2 - 100)
  text("I know where you live", width/2, height/2 + 100)

  stroke('black')
  text("Do you think God stays in heaven", width/2, height/2 + 200)
  text("Because he is afraid of what he has created", width/2, height/2 + 300)


}