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
    game.ball.move(game.paddle.xCurrent, game.paddle.yCurrent, game.paddle.paddleWidth);
    requestAnimationFrame(gameLoop); // this function will always be called in the web loop
}

gameLoop();
