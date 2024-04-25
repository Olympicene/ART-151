let player;
let platforms = [];


function setup() {
  createCanvas(windowWidth, windowHeight - 120);
  player = new Player();

  platforms.push(new Platform(100, height - 50, 200, 20));
  platforms.push(new Platform(300, height - 150, 150, 20));
  platforms.push(new Platform(500, height - 250, 200, 20));
  platforms.push(new Platform(700, height - 350, 150, 20));
  platforms.push(new Platform(900, height - 450, 250, 20));
  platforms.push(new Platform(1100, height - 200, 200, 20));
  platforms.push(new Platform(1300, height - 300, 150, 20));
  platforms.push(new Platform(1500, height - 400, 200, 20));
  platforms.push(new Platform(1700, height - 500, 150, 20));
  platforms.push(new Platform(1900, height - 600, 250, 20));
  platforms.push(new Platform(2100, height - 700, 200, 20));
  platforms.push(new Platform(2300, height - 800, 150, 20));
  platforms.push(new Platform(2500, height - 900, 250, 20));
  platforms.push(new Platform(2700, height - 1000, 200, 20));
  platforms.push(new Platform(2900, height - 1100, 150, 20));
}

function draw() {
  background(0);
  
  // Update and display the player
  player.update();
  player.display();
  
  // Display the platform
  for (platform of platforms) {
    platform.display();
    player.collide(platform);

    // Check for collision between player and platform
  }

}

class Player {
  constructor() {
    this.width = 20;
    this.height = 40;
    this.x = width / 2;
    this.y = height / 2;
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.6;
    this.jumpForce = -12;
  }

  update() {
    // Apply gravity
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    this.x += this.velocityX;
    
    // Boundaries
    if (this.y > height - this.height) {
      this.y = height - this.height;
      this.velocityY = 0;
    }
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  jump() {
      this.velocityY = this.jumpForce;
  }
  
  moveLeft() {
    this.velocityX = -3;
  }
  
  moveRight() {
    this.velocityX = 3;
  }
  
  stop() {
    this.velocityX = 0;
  }

  collide(platform) {
    // Collision detection
    if (
      this.x + this.width > platform.x &&
      this.x < platform.x + platform.width &&
      this.y + this.height > platform.y &&
      this.y < platform.y + platform.height
    ) {
      // Reset player's position if collision occurs
      this.y = platform.y - this.height;
      this.velocityY = 0;
    }
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  display() {
    fill(60, 60, 60);
    rect(this.x, this.y, this.width, this.height);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.jump();
  } else if (keyCode === LEFT_ARROW) {
    player.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    player.moveRight();
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.stop();
  }
}
