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
		this.ready = true;
		this.draw();
	}

	draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.xCurrent, this.yCurrent, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

	resetPosition() {
		this.xCurrent = this.widthLimit / 2;
		this.yCurrent = this.heightLimit / 2;
		this.dx = 4;
        this.dy = -4;
	}

	move(xPaddleCurrent, yPaddleCurrent, paddleWidth) {
		this.xCurrent += this.dx;
		this.yCurrent += this.dy;

		// wall collision
		if (this.xCurrent - this.radius < 0 || this.xCurrent + this.radius > this.widthLimit) {
			this.dx = -this.dx;
		}

		// ceil collision
		if (this.yCurrent - this.radius < 0) {
			this.dy = -this.dy;
		}
		
		// ground collision
		if (this.yCurrent + this.radius > this.heightLimit) {
			this.ready = false;
			this.resetPosition();
			return false;
		}
		

		// paddle collision
		if (this.yCurrent + this.radius >= yPaddleCurrent &&
			this.xCurrent >= xPaddleCurrent &&
			this.xCurrent <= xPaddleCurrent + paddleWidth) {
			this.dy = -this.dy;
		}
		this.draw();
		return true;
	}
}