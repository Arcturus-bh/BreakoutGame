const name = "Deminor";
const canvas = document.getElementById("game");
let ctx = c.getContext("2d");

let maxScore = 10;
let currentScore = 0;

function updateScore(points) {
	if (currentScore + points >= maxScore) {
		currentScore = maxScore;
		console.log("Score max atteint! ("  + currentScore + ")");
		return;
	} else {
		currentScore += points;
		console.log("Nouveau score: " + currentScore);
	}
}

updateScore(5);
updateScore(34);