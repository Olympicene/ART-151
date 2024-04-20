let ball;
let paddle1;
let paddle2;

const speed = 20;


function setup() {

	
	var clientHeight = document.getElementById('main').clientHeight;
	var clientWidth = document.getElementById('main').clientWidth;

	var cnv = createCanvas(clientWidth, clientHeight);
	cnv.parent("main");

	paddle1 = new Paddle(20, height - 10, 20, 100)
	paddle2 = new Paddle(width - 20, 10, 20, 100)

	resetBall();

}

function draw() {
  background(60, 60, 60);
//   background(0)
  drawBall()
  paddle1.draw()
  paddle1.follow()

  paddle2.draw()
  paddle2.follow()
}

function resetBall() {
	
	x = Math.random() * 2 - 1;
	y = Math.random() * 2 - 1;
	while(abs(x) > 0.7 && abs(y) < 0.4) {
		x = Math.random() * 2 - 1;
		y = Math.random() * 2 - 1;
	}

	const magnitude = Math.sqrt(x * x + y * y);

	const unitVector = {
		x: x / magnitude,
		y: y / magnitude
	};

	ball = {
		width: 25,
		height: 25,
		x: width/2,
		y: height/2,
		vel: {
			x: speed * unitVector.x,
			y: speed * unitVector.y,
		},
	}
}

function drawBall() {
	push();
		rectMode(CENTER)
		rect(ball.x, ball.y, ball.width)
		ball.x += ball.vel.x
		ball.y += ball.vel.y

		if (rectanglesCollided(ball, paddle1) || rectanglesCollided(ball, paddle2)) {
			ball.vel.x = ball.vel.x * -1;
			ball.vel.y *= 1.10
		}

		if (ball.x - ball.width/2 < 0 || ball.x > width - ball.width/2) {
			resetBall()
		}

		if (ball.y - ball.width/2 < 0 || ball.y > height - ball.width/2) {
			ball.vel.y = ball.vel.y * -1;
		}
	pop();
}

class Paddle {
	vel = {
		x: 0,
		y: 0,
	}

	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw() {
		push();
		rectMode(CENTER)
		rect(this.x, this.y, this.width, this.height)
		
		if(this.x < ball.x && ball.vel.x < 0 || this.x > ball.x && ball.vel.x > 0) {
			if (ball.y > this.y)
				this.y += speed * 0.9;
			if (ball.y < this.y)
				this.y -= speed * 0.9
		} else {
			if (ball.y > this.y)
				this.y += speed/2;
			if (ball.y < this.y)
				this.y -= speed/2;
		}
	}

	follow() {
		if(this.x < ball.x && ball.vel.x > 0 || this.x > ball.x && ball.vel.x < 0) {
			if (ball.y > this.y)
				this.vel.y += 0.1
			if (ball.y < this.y)
				this.vel.y -= 0.1
		} else {
			if (ball.y > this.y)
				this.vel.y += 0.1
			if (ball.y < this.y)
				this.vel.y -= 0.1
		}
	}
}

function rectanglesCollided(rect1, rect2) {
    // Calculate half-width and half-height of each rectangle
    const rect1HalfWidth = rect1.width / 2;
    const rect1HalfHeight = rect1.height / 2;
    const rect2HalfWidth = rect2.width / 2;
    const rect2HalfHeight = rect2.height / 2;

    // Calculate distance between centers of rectangles
    const dx = rect2.x - rect1.x;
    const dy = rect2.y - rect1.y;
    const combinedHalfWidth = rect1HalfWidth + rect2HalfWidth;
    const combinedHalfHeight = rect1HalfHeight + rect2HalfHeight;

    // Check collision
    if (Math.abs(dx) < combinedHalfWidth && Math.abs(dy) < combinedHalfHeight) {
        return true; // Collided
    } else {
        return false; // Not collided
    }
}

