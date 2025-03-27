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