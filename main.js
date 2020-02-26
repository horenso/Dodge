var player, gaps;

var State = { STARTSCREEN: 0, RUNNNING: 1, LOST: 2 };
var gameState = State.STARTSCREEN;
var score;
var slowMo = false;
var gameSpeed = 1.0;
var obstacleSpeed;
var acceleration = 0.0;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	player = new Player();
	gapStream = new GapStream();
	this.focus();
	score = 0;
	obstacleSpeed = OBSTACLESTARTSPEED;
}

function userMovement() {
	if (keyIsDown(32) && player.canSlowMo()) {
		slowMo = true;
	} else {
		slowMo = false;
	}

	if (slowMo) {
		gameSpeed = SLOWMOSPEED;
	} else {
		gameSpeed = NORMALSPEED;
	}

	if (keyIsDown(37) || keyIsDown(65)) {
		acceleration -= PLAYERACCELERATION;
		acceleration = constrain(acceleration, -PLAYERSPEED, PLAYERSPEED);
		player.move(acceleration * gameSpeed * deltaTime);
	} else if (keyIsDown(39) || keyIsDown(68)) {
		acceleration += PLAYERACCELERATION;
		acceleration = constrain(acceleration, -PLAYERSPEED, PLAYERSPEED);
		player.move(acceleration * gameSpeed * deltaTime);
	} else {
		if (acceleration < - (2 * PLAYERACCELERATION)) {
			acceleration += PLAYERACCELERATION;
		} else if (acceleration > (2 * PLAYERACCELERATION)) {
			acceleration -= PLAYERACCELERATION;
		} else {
			acceleration = 0;
		}
	}
}

function keyTyped() {
	if (key === ' ') {
		if (gameState === State.STARTSCREEN) {
			gameState = State.RUNNNING;
		}
		if (gameState === State.LOST) {
			gameState = State.RUNNNING;
			setup();
		}
	}
}

function draw() {
	background(220);

	if (gameState === State.STARTSCREEN) {
		rectMode(CENTER);
		rect(WIDTH / 2, HEIGHT / 2, WIDTH / 4);
		textFont("monospace", 40);
		textAlign(CENTER, CENTER);
		text('SPACE TO START', WIDTH / 2, HEIGHT / 2);
	}

	if (gameState === State.RUNNNING) {
		userMovement();
		gapStream.update();
		gapStream.checkCollition(player);

		gapStream.draw();
		player.draw();
		drawScore();
		obstacleSpeed += 0.00001;
	}

	if (gameState === State.LOST) {
		rectMode(CENTER);
		rect(WIDTH / 2, HEIGHT / 2, WIDTH / 4);
		textFont("monospace", 40);
		textAlign(CENTER, CENTER);
		text('SCORE: ' + score, WIDTH / 2, HEIGHT / 2);
	}
}

function drawScore() {
	fill('black');
	textFont("monospace", 20);
	textAlign(LEFT, TOP);
	text('SCORE: ' + score, 0, 0);
}