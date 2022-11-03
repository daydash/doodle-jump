var c = document.createElement("canvas");
var ctx = c.getContext("2d");

var screenWidth = 800;
var screenHeight = 800;
c.width = screenWidth;
c.height = screenHeight;

// let beat = new Audio("/sounds/beat.mp3");

// var screenWidth = window.screen.availWidth;
// var screenHeight = window.screen.availHeight - 100;
// c.width = window.screen.availWidth;
// c.height = window.screen.availHeight - 100;

document.body.appendChild(c);

window.addEventListener("keydown", this.keydown, false);
window.addEventListener("keyup", this.keyup, false);

//Variables
const gravity = 0.34;
var holdingLeftKey = false;
var holdingRightKey = false;
var keycode;
var dead = false;
var difficulty = 0;
var lowestBlock = 0;
var score = 0;
var maxScore = 0;
var yDistanceTravelled = 0;
var lifeLine = 3;
var ultraSpeed = false;

var blocks = [];
var powerups = [];

//Time variables
var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

function keydown(e) {
	if (e.keyCode === 65 || e.keyCode === 37) {
		holdingLeftKey = true;
	} else if (e.keyCode === 68 || e.keyCode === 39) {
		holdingRightKey = true;
	}

	if (e.keyCode === 82 && dead) {
		blocks = [];
		lowestBlock = 0;
		difficulty = 0;
		lifeLine = 3;

		if (maxScore < score) {
			maxScore = score;
		}
		score = 0;
		yDistanceTravelled = 0;
		player.springBootsDurability = 0;

		blocks.push(new block());
		blocks[0].x = 300;
		blocks[0].y = 700;
		blocks[0].monster = 0;
		blocks[0].type = 0;
		blocks[0].powerup = 0;

		blockSpawner();

		player.x = 300;
		player.y = 550;

		dead = false;
	}
}

function keyup(e) {
	if (e.keyCode === 65 || e.keyCode === 37) {
		holdingLeftKey = false;
	} else if (e.keyCode === 68 || e.keyCode === 39) {
		holdingRightKey = false;
	} else if (e.keyCode === 83) {
		ultraSpeed = !ultraSpeed;
	}
}

function showScore() {
	if (yDistanceTravelled > score) {
		score = Math.round(yDistanceTravelled);
	}

	ctx.font = "36px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "left";
	ctx.fillText(score, 15, 40);
}

function showHighestScore() {
	if (yDistanceTravelled > score) {
		score = Math.round(yDistanceTravelled);
	}

	ctx.font = "20px Arial";
	ctx.fillStyle = "red";
	ctx.textAlign = "left";
	if (maxScore > score) {
		// ctx.fillText(maxScore, window.screen.availWidth - 100, 38);
		ctx.fillText(maxScore, 745, 38);
	} else {
		// ctx.fillText(score, window.screen.availWidth - 100, 38);
		ctx.fillText(score, 745, 38);
	}
}

function textHighestScore() {
	ctx.font = "18px sans-serif";
	ctx.fillStyle = "red";
	ctx.fillText("Highest Score", 620, 36.4);
	ctx.textAlign = "left";
	// ctx.strokeText("Highest Score", window.screen.availWidth - 225, 36.4);
	// ctx.strokeText("Highest Score", 620, 36.4);
	// ctx.strokeStyle = "red";
}

function showLifeLine() {
	ctx.font = "20px Arial";
	ctx.fillStyle = "red";
	ctx.textAlign = "left";
	ctx.fillText(lifeLine, 745, 64);
}

function textLifeLine() {
	ctx.font = "18px sans-serif";
	ctx.fillStyle = "red";
	ctx.fillText("Life-Lines", 621, 62.4);
	ctx.textAlign = "left";
	// ctx.strokeText("Highest Score", window.screen.availWidth - 225, 36.4);
	// ctx.strokeText("Life-Lines", 621, 62.4);
	// ctx.strokeStyle = "red";
}

function textSuperSpeed() {
	ctx.font = "24px normal";
	ctx.fillStyle = "red";
	ctx.fillText("Press S for Super Speed", 300, 42.4);
	ctx.textAlign = "left";
}
function textNormalSpeed() {
	ctx.font = "24px normal";
	ctx.fillStyle = "red";
	ctx.fillText("Press S for Normal Speed", 300, 42.4);
	ctx.textAlign = "left";
}

function textName() {
	ctx.font = "200px normal";
	ctx.fillStyle = "red";
	ctx.fillText("Yash", 150, 400);
	ctx.textAlign = "left";
	// ctx.strokeText("Highest Score", window.screen.availWidth - 225, 36.4);
	// ctx.strokeText("Yash", 300, 400);
	// ctx.strokeStyle = "red";
}

blocks.push(new block());
blocks[0].x = 300;
blocks[0].y = 650;
blocks[0].monster = 0;
blocks[0].type = 0;
blocks[0].powerup = 0;

blockSpawner();

// function superSpeed() {
// 	ultraSpeed = true;
// }
// function normalSpeed() {
// 	ultraSpeed = false;
// }

function loop() {
	requestAnimationFrame(loop);

	//This sets the FPS to 60
	now = Date.now();
	delta = now - then;

	if (delta > interval) {
		var backgroundImage = new Image();
		backgroundImage.src = "Sprites/background.png";
		ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight);

		// var leftButton = new Image();
		// leftButton.src = "Sprites/leftButton.png";
		// ctx.drawImage(leftButton, 35, 700, 75, 75);

		// // var buttons = document.getElementById("button");
		// // buttons.innerHTML = '<img src="Sprites/leftButton.png" />';

		// var rightButton = new Image();
		// rightButton.src = "Sprites/rightButton.png";
		// ctx.drawImage(rightButton, 670, 700, 75, 75);

		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i] !== 0) {
				blocks[i].update();
				blocks[i].draw();
			}
		}

		player.update();
		player.draw();

		showScore();
		showHighestScore();
		textHighestScore();
		showLifeLine();
		textLifeLine();

		if (ultraSpeed) {
			textNormalSpeed();
			here_the_code_fcked();
		} else {
			textSuperSpeed();
		}
		// textName();

		ctx.fill();
		then = now - (delta % interval);
	}
}

loop();
