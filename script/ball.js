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