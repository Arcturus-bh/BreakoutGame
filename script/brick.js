class Brick {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = true;
        this.color = this.randomColor();
    }

    draw() {
        if (!this.visible)
            return;
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    hide() {
        this.visible = false;
    }

    randomColor() {
        let hexa = "0123456789abcdef";
        let color = "#";

        for (let i = 0; i < 6; i++)
            color += hexa[Math.floor(Math.random() * hexa.length)];
        return color;
    }
}