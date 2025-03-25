class Game {
	constructor() {
		this.name = "Casse-brique";
		this.canvas = new GameCanvas();
		this.ctx = this.canvas.canvas.getContext('2d');
		this.maxScore = 10;
		this.currentScore = 0;
		this.displayPaddle();
	}

	displayPaddle() {
		this.ctx.strokeStyle = '#FF0000';
		this.ctx.beginPath();
		this.ctx.moveTo(50, 150);
		this.ctx.lineTo(250, 150);
		this.ctx.stroke();
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

const score = new Game();


document.addEventListener('keydown', function(event) {
	if (event.key === 'ArrowLeft') {
		console.log('Flèche gauche pressée');
        // Ajoute ici la logique pour déplacer la raquette vers la gauche
    } else if (event.key === 'ArrowRight') {
		console.log('Flèche droite pressée');
        // Ajoute ici la logique pour déplacer la raquette vers la droite
    }
});