const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore'); // Use getElementById instead of getElementsByClassName
var mostRecentScore = localStorage.getItem('mostRecentScore');


finalScore.innerText = mostRecentScore; // Assign the value to innerText property of the element

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };

    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("/");
}

