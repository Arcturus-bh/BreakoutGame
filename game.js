class Game {
	constructor() {
		this.name = "Casse-brique";
		this.canvas = new GameCanvas();
		this.ctx = this.canvas.canvas.getContext('2d');
		this.maxScore = 10;
		this.currentScore = 0;
		//
		this.paddle = new Paddle(this.ctx, this.canvas.width);
		this.ball = new Ball(this.ctx, this.canvas.width, this.canvas.height)
	}

	updateScore(points) {
		if (this.currentScore + points >= this.maxScore)
		{
			this.currentScore = this.maxScore;
			console.log("Score max atteint! ("  + this.currentScore + ")");
			return;
		}
		this.currentScore += points;
		console.log("Nouveau score: " + this.currentScore);
	}
}

class Paddle {
	constructor(ctx, widthLimit) {
		this.ctx = ctx;
		this.widthLimit = widthLimit;
		this.xStart = 150;
		this.yStart = 580;
		this.xCurrent = this.xStart;
		this.yCurrent = this.yStart;
		this.paddleWidth = 75;
		this.paddleHeight = 10;
		this.speed = 5;
		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, this.yCurrent - this.paddleHeight, this.widthLimit, this.paddleHeight * 2);
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.moveTo(this.xCurrent, this.yCurrent);
		this.ctx.lineTo(this.xCurrent + this.paddleWidth, this.yCurrent);
		this.ctx.stroke();
	}

	moveLeft() {
		if (this.xCurrent - this.speed < 0) {
			this.xCurrent = 0;
		} else {
			this.xCurrent -= this.speed;
		}
		this.draw();
	}

	moveRight() {
		if ((this.xCurrent + this.paddleWidth) + this.speed > this.widthLimit) {
			this.xCurrent = this.widthLimit - this.paddleWidth;
		} else {
			this.xCurrent += this.speed;
		}
		this.draw();
	}
}

class Ball {
	constructor(ctx, widthLimit, heightLimit) {
		this.ctx = ctx;
		this.heightLimit = heightLimit;
		this.widthLimit = widthLimit;

		this.radius = 6;
        this.xCurrent = widthLimit / 2;
        this.yCurrent = heightLimit / 2;
        this.dx = 4;
        this.dy = -4;
        this.color = '#5505a0ad';
		this.draw();
	}

	draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.xCurrent, this.yCurrent, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

	move(xPaddleCurrent, yPaddleCurrent, paddleWidth) {
		this.xCurrent += this.dx;
		this.yCurrent += this.dy;
		if (this.xCurrent - this.radius < 0 || this.xCurrent + this.radius > this.widthLimit) {
			this.dx = -this.dx; // reverse dir for go to canvas other side
			console.log("collision mur latéral");
		}
		if (this.yCurrent - this.radius < 0) {
			this.dy = -this.dy; // reverse dir for go to canvas bottom
			console.log("collision plafond");
		}

		if (this.yCurrent + this.radius >= yPaddleCurrent &&
			this.xCurrent >= xPaddleCurrent &&
			this.xCurrent <= xPaddleCurrent + paddleWidth) {
			this.dy = -this.dy;
			console.log("collision paddle");
			}
		this.draw();
	}
}

class GameCanvas {
	constructor() {
		this.canvas = document.getElementById('game');
		this.width = 400;
		this.height = 600;
		this.borderColor = '#5505a0ad';

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.border = `4px solid ${this.borderColor}`;
	}
}

const game = new Game();


// --- events for paddle motion fluidity (no cut when changing direction)
pressedKeys = {};
document.addEventListener('keydown', function(event) {
    pressedKeys[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    pressedKeys[event.key] = false;
});

function updatePaddle() {
    if (pressedKeys["ArrowLeft"] || pressedKeys["a"] || pressedKeys["q"] || pressedKeys["z"]) {
        game.paddle.moveLeft();
    }
    if (pressedKeys["ArrowRight"] || pressedKeys["d"] || pressedKeys["e"] || pressedKeys["c"]) {
        game.paddle.moveRight();
    }
}

function gameLoop() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	updatePaddle();
    game.paddle.draw();
    game.ball.move(game.paddle.xCurrent, game.paddle.yCurrent);
    requestAnimationFrame(gameLoop); // this function will always be called in the web loop
}

gameLoop();
