class Ball {
	constructor(ctx, widthLimit, heightLimit) {
		this.ctx = ctx;
		this.heightLimit = heightLimit;
		this.widthLimit = widthLimit;
        this.x = widthLimit / 2;
        this.y = heightLimit / 2;
		this.radius = 6;
        this.dx = 4;
        this.dy = -4;
        this.color = '#000000';
		this.ready = true;
		this.draw();
	}

	draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

	move() {
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}

	reset() {
		this.x = this.widthLimit / 2;
		this.y = this.heightLimit / 2;
		this.dx = 4;
        this.dy = -4;
	}

	bounceX() {
		this.dx = -this.dx;
	}

	bounceY() {
		this.dy = -this.dy;
	}

	isReady() {
		this.ready = true;
	}

	isNotReady() {
		this.ready = false;
	}
}