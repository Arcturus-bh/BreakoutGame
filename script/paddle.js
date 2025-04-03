class Paddle {
	constructor(ctx, widthLimit) {
		this.ctx = ctx;
		this.widthLimit = widthLimit;
		this.startX = 150;
		this.startY = 580;
		this.x = this.startX;
		this.y = this.startY;
		this.width = 75;
		this.height = 10;
		this.speed = 5;
		this.color = '#000000';
		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, this.y - this.height, this.widthLimit, this.height * 2);
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(this.x + this.width, this.y);
		this.ctx.stroke();
	}

	moveLeft() {
		if (this.x - this.speed < 0) {
			this.x = 0;
		} else {
			this.x -= this.speed;
		}
		this.draw();
	}

	moveRight() {
		if ((this.x + this.width) + this.speed > this.widthLimit) {
			this.x = this.widthLimit - this.width;
		} else {
			this.x += this.speed;
		}
		this.draw();
	}
}