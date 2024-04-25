let font;
let player;
let bullets = [];
let aliens = [];
let alienSpeed = 5;
let alienRows = 5;  
let alienCols = 8;
let alienSpacing = 40;
let score = 0;

function preload() {
    font = loadFont("Arcadepix_Plus.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight- 120);
  player = new Player();

  while(alienCols * 40 < width/2) {
    alienCols += 1
  }
  createAliens();
  textFont(font)
}

function draw() {
  background(0);
  
  player.show();
  player.move();
  
  // Display and move bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].show();
    bullets[i].move();
    
    // Remove bullets when they leave the screen
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
      continue;
    }
    
    // Check for bullet collisions with aliens
    for (let j = aliens.length - 1; j >= 0; j--) {
      if (bullets[i].hits(aliens[j])) {
        bullets.splice(i, 1);
        aliens.splice(j, 1);
        score += 10;
        break;
      }
    }
  }
  
  // Display and move aliens
  for (let alien of aliens) {
    alien.show();
    alien.move();
    
    // Check for alien collisions with player
    if (alien.hits(player)) {
      gameOver();
    }
    
    // Check if aliens have reached bottom
    if (alien.y > height - 50) {
      gameOver();
    }
  }
  
  // Display score
  fill(255);
  textSize(64);
  text("Score: " + score, 20, 40);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.setDir(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.setDir(1);
  } else if (key === ' ') {
    bullets.push(new Bullet(player.x + player.width / 2, height - 50));
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.setDir(0);
  }
}

function createAliens() {
  for (let i = 0; i < alienRows; i++) {
    for (let j = 0; j < alienCols; j++) {
      aliens.push(new Alien(j * alienSpacing + 80, i * 50 + 50));
    }
  }
}

function gameOver() {
  noLoop();
  textAlign(CENTER);
  textSize(64);
  fill(255);
  text("Game Over", width / 2, height / 2);
}

class Player {
  constructor() {
    this.width = 60;
    this.height = 20;
    this.x = width / 2 - this.width / 2;
    this.y = height - 30;
    this.speed = 5;
    this.direction = 0;
  }
  
  show() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }
  
  move() {
    this.x += this.direction * this.speed;
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  setDir(dir) {
    this.direction = dir;
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 4;
    this.speed = 5;
  }
  
  show() {
    fill(255, 255, 255);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  move() {
    this.y -= this.speed;
  }
  
  hits(alien) {
    let d = dist(this.x, this.y, alien.x, alien.y);
    return d < this.radius + alien.radius;
  }
}

class Alien {

  static alldir = alienSpeed;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.xdir = alienSpeed;
  }
  
  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.radius * 2);
  }
  
  move() {
    if(this.x > width || this.x < 0) {
        this.xdir *= -1
        this.y += 25
    }

    this.x += this.xdir;
  }
  
  hits(player) {
    let d = dist(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2);
    return d < this.radius + player.width / 2;
  }
}
