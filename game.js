const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("question-counter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let answers = true;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];
let questions = [{
    question: "How many legs does a spider have?",
    choice1: "Two",
    choice2: "Three",
    choice3: "Four",
    choice4: "Eight",
    answer: 4
},
{
    question: "Which big cat is the largest?",
    choice1: "Tiger",
    choice2: "Lion",
    choice3: "Horse",
    choice4: "Elephant",
    answer: 1
},
{
    question: "How long is an Olympic swimming pool (in meters)?",
    choice1: "50 meters",
    choice2: "60 meters",
    choice3: "70 meters",
    choice4: "80 meters",
    answer: 1
},
{
    question: " In what year did World War II end?",
    choice1: "1935",
    choice2: "1896",
    choice3: "1945",
    choice4: "1915",
    answer: 3
},
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;


startGame = () => {
    questionCounter = 0;
    score = 0;
    avaliableQuestions =[...questions];
    // console.log(avaliableQuestions);
    getNewQuestion();

};
getNewQuestion = () => {
    if(avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/end.html");
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() == avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' +number];
    });
    avaliableQuestions.splice(questionIndex, 1);
    answers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!answers) return;

        answers = false;
        const selectedChoice = e.target;
        const answer = selectedChoice.dataset["number"];

        const classToApply = "incorrect";
        if(answer == currentQuestion.answer){
            console.log(classToApply.innerHTML = "correct");
            incrementScore(CORRECT_BONUS);
        }else{
            console.log(classToApply.innerHTML = "incorrect");
        }

    
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( ()=> {
        selectedChoice.parentElement.classList.remove(classToApply);
    
        getNewQuestion();  
        },500);
       
       
    })
})
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
