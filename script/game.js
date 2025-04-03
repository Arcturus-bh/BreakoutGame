class Game {
	constructor() {
		this.canvas = new GameCanvas();
		this.ctx = this.canvas.canvas.getContext('2d');
		this.maxLife = 2;
		this.currentLife = this.maxLife;
		//
		this.continueGame = true;
		this.gameOver = false;
		this.lifeLabel = "";
		this.updateLifeLabel();
		//
		this.paddle = new Paddle(this.ctx, this.canvas.width);
		this.ball = new Ball(this.ctx, this.canvas.width, this.canvas.height)
		this.brick = new Brick(this.ctx, 100, 0, 100);
		this.bricks = [];
		this.initBricks();
	}

	updateLifeLabel() {
		this.lifeLabel = "❤ ".repeat(this.currentLife).trim();
	}

	updateLife() {
		if (--this.currentLife < 0)
		{
			this.currentLife = -1;
			document.getElementById("life").innerText = "Game Over";
			document.getElementById("break").innerText = "";
			this.gameOver = true;
			return;
		}
		this.updateLifeLabel();
		this.countdown();
	}

	initBricks() {
		let spacingX = 10;
		let spacingY = 22;
		let brickWidth = this.canvas.width / 10;
		let brickHeight = 20;
		let offsetX = (this.canvas.width - (brickWidth * 8 + spacingX * (8 - 1))) / 2;
		for (let row = 0; row < 6; row++)
		{
			let col = 0;
			for (; col < 8; col++)
			{
				let x = offsetX + (brickWidth + spacingX) * col
				let y = 10 + (brickHeight + spacingY) * row
				this.bricks.push(new Brick(this.ctx, x, y, brickWidth, brickHeight));
			}
		}
	}

	drawBricks() {
		for (const element of this.bricks)
			element.draw();
	}

	checkWin() {
		for (const element of this.bricks)
		{
			if (element.visible)
				return;
		}
		this.gameOver = true;
		document.getElementById("life").innerText = "YOU WON ✌";
		document.getElementById("break").innerText = "🎊🎉🎉🎉🎊";
	}

	checkBallCollision() {
		// wall collision
		if (this.ball.x - this.ball.radius < 0 || this.ball.x + this.ball.radius > this.canvas.width)
			this.ball.bounceX();

		// ceil
		if (this.ball.y - this.ball.radius < 0)
			this.ball.bounceY();
		
		// paddle
		if (this.ball.dy > 0 &&
			this.ball.y + this.ball.radius >= this.paddle.y &&
			this.ball.x >= this.paddle.x &&
			this.ball.x <= this.paddle.x + this.paddle.width)
		{
				this.ball.bounceY();
		}

		// brick
		for (const element of this.bricks)
		{
			if (!element.visible)
				continue;
			if (this.ball.x + this.ball.radius >= element.x &&
				this.ball.x - this.ball.radius <= element.x + element.width &&
				this.ball.y + this.ball.radius >= element.y &&
				this.ball.y - this.ball.radius <= element.y + element.height)
			{
				element.hide();
				this.ball.bounceY();
				break;
			}
		}

		// floor
		if (this.ball.y + this.ball.radius > this.canvas.height) {
			this.continueGame = false;
			this.ball.isNotReady();
			this.ball.reset();
		}
	}
	
	countdown() {
		let countdown = 3;
		const label = document.getElementById("break");
		const interval = setInterval(() => {
			label.innerText = "⌛ Game restarting in " + countdown;
			countdown--;
			
			if (countdown < 0)
			{
				clearInterval(interval); // Countdown stop
				label.innerText = "🎮 Game in progress...";
				game.ball.isReady();     
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

function getInfoStatus() {
	let info = "";
	if (game.currentLife > 0)
		info = "Life: " + game.lifeLabel;
	else if (game.currentLife === 0)
		info = "Life: Last chance";
	else
		info = "Game Over";
	return info;
}

function gameLoop() {
	document.getElementById("life").innerText = getInfoStatus();
	game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	if (!game.gameOver)
	{
		updatePaddle();
		game.paddle.draw();
		game.drawBricks();
	}
	if (!game.gameOver && game.continueGame && game.ball.ready)
	{
    	game.ball.move();
		game.checkBallCollision();
	} 
	else if (!game.continueGame && !game.ball.ready)
	{
		game.updateLife();
		game.continueGame = true;
	}
	game.checkWin();
    requestAnimationFrame(gameLoop); // this function will always be called in the web loop
}


const game = new Game();
document.getElementById("break").innerText = "🎮 Game in progress...";
gameLoop();
