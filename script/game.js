class Game {
	constructor() {
		this.name = "Casse-brique";
		this.canvas = new GameCanvas();
		this.ctx = this.canvas.canvas.getContext('2d');
		this.maxLife = 3;
		this.continueGame = true;
		this.currentLife = this.maxLife;
		this.lifeLabel = "";
		this.updateLifeLabel();
		//
		this.paddle = new Paddle(this.ctx, this.canvas.width);
		this.ball = new Ball(this.ctx, this.canvas.width, this.canvas.height)
	}

	updateLifeLabel() {
		this.lifeLabel = "❤ ".repeat(this.currentLife).trim();
	}

	updateLife() {
		if (--this.currentLife < 0)
		{
			this.currentLife = 0;
			document.getElementById("life").innerText = "Game Over";
			document.getElementById("break").innerText = "";
			//this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			return;
		}
		this.updateLifeLabel();
		this.countdown();
	}

	countdown() {
		let countdown = 3;
		const label = document.getElementById("break");
		const interval = setInterval(() => {
			label.innerText = "⌛ Game restarting in " + countdown;
			countdown--;
			
			if (countdown < 0) {
				clearInterval(interval); // Countdown stop
				label.innerText = "🎮 Game in progress...";              
				this.ball.ready = true;
				this.continueGame = true;
			}
		}, 1000); // 1sec
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
document.getElementById("break").innerText = "🎮 Game in progress...";


// --- paddle motion fluidity event (no cut when changing direction)
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
	document.getElementById("life").innerText = "Life: " + game.lifeLabel;
	//
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	updatePaddle();
    game.paddle.draw();
	//
	if (game.ball.ready === true)
    	game.continueGame = game.ball.move(game.paddle.xCurrent, game.paddle.yCurrent, game.paddle.paddleWidth);
	if (game.ball.ready === false && game.continueGame === false) {
		game.updateLife();
		game.continueGame = true;
	}
	//
    requestAnimationFrame(gameLoop); // this function will always be called in the web loop
}

gameLoop();
document.getElementById("break").innerText = "Game Over";
