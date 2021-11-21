// State
var secondsLeft = 100;
var wrongAns = false;
var stopGame = false;

// DOM elements
var timeLeft = document.querySelector("#current-time");
var startBtn = document.querySelector("#start-btn");
var startScreen = document.querySelector("#start-screen");
const questionEl = document.querySelector("#question-container");
var theQuestion = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
const goBack = document.querySelector("#go-back-btn");
// const viewHighscore = document.querySelector("#view-highscores");
// const theHighscores = document.querySelector("#highscores");
let shuffledQuestions, currentQuestion
var ansBtns;
var allDone = document.querySelector("#all-done");
var finalScore = document.getElementById("#your-score");
 


// The Question Array
questionArray = [
    {question:"Commonly used data types DO NOT include:" , answers: [{text: "strings"},{text: "booleans"},{text: "alerts"},{text: "numbers"}],
      correct:"alerts"
    },
    {question:"The condition in an if / else statement is enclosed within ____." , answers: [{text: "quotes"},{text: "curly brackets"},{text: "parentheses"},{text: "square brackets"}],
      correct: "parentheses"
    },
    {question:"Arrays in JavaScript can be used to store ____." , answers: [{text: "numbers and strings"},{text: "other arrays"},{text: "booleans"},{text: "all of the above"}],
      correct: "all of the above"
    },
    {question:"String values must be enclosed within ____ when being assigned to variables." , answers: [{text: "commas"},{text: "curly brackets"},{text: "quotes"},{text: "parentheses"}],
      correct: "quotes"
    },
    {question:"A very useful tool used during development and debugging for printing content to the debugger is:" , answers: [{text: "Javascript"},{text: "terminal / bash"},{text: "for loops"},{text: "console.log"}],
      correct: "console.log"
    }
  ]

// Making buttons do things
startBtn.addEventListener('click', startQuiz);
goBack.addEventListener('click', restart);
answers.addEventListener('click', function(event){
    var event = event.target;
    checkAnswer(event.textContent.trim());
    setQuestion();
});



// Timer
function timer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeLeft.textContent = "Time: " + secondsLeft;

        // Take off 10 seconds if a wrong answer and then reset wrongAns to false
        if (wrongAns) {
            secondsLeft-= 10;
            wrongAns = false;
        } 
    
        // If the questions end or there are 0 seconds left, stop the timer and go to the submission page
        if (secondsLeft === 0 || endGame === true) {
            clearInterval(timerInterval);
            gameOver();
            }
        //   Stop timer if stopGame ever becomes true
        if (stopGame) {
            stopGame = false;
            clearInterval(timerInterval);
            secondsLeft = 100;
            timeLeft.textContent = "Time: " + secondsLeft;
        }
    }, 1000);
}

// Start Quiz
function startQuiz() {
    timer();
    // Hide Start screen and show Question screen
    startScreen.classList.add('hide');
    shuffledQuestions = questionArray.sort(() => Math.random() - .5);
    questionEl.classList.remove('hide');
    currentQuestion = 0;
    questionEl.classList.remove("hide");
    setQuestion();
    // ensure game states
    endGame = false;
    stopGame = false;
}
// Set and show questions
function setQuestion () {
    resetState();
    showQuestion(shuffledQuestions[currentQuestion]);
}
function showQuestion(question) {
    // show the question
    theQuestion.innerText = question.question;
    // render the buttons for the answers
    question.answers.forEach(answer => {
        ansBtns = document.createElement('button');
        ansBtns.innerText = answer.text;
        ansBtns.classList.add("btn", "answer-btns");
        answersEl.appendChild(ansBtns);
    })
}
function resetState () {
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild);
        ansFeedback.innerText = ""
    }
}
// Check Answers
function checkAnswer (event){
    const endOfArray = questionArray.length - 1;
    if (currentQuestion == endOfArray) {
        endGame = true;
        gameOver();
    } else if ((currentQuestion == endOfArray) && (event != shuffledQuestions[currentQuestion].correct)) {
        wrongAns = true;
        endGame = true;
        gameOver();
    } else if (event === shuffledQuestions[currentQuestion].correct) {
        ansFeedback.classList.add("right-ans");
        ansFeedback.innerText = "That was correct";
        currentQuestion++;
    } else {
        ansFeedback.classList.add("wrong-ans");
        ansFeedback.innerText = "That was wrong";
        wrongAns = true;
        currentQuestion++;
    }
}

// When the game is over
function gameOver () {
    var playerScore;
    //hide the question container
    questionEl.classList.add("hide");
    // show the end screen
    allDone.classList.remove("hide");
    // show a score
    timeLeft.textContent = "Time: " + secondsLeft;
    playerScore = secondsLeft;
    finalScore.textContent = "Final Score: " + playerScore;
}


// Restart for when Go Back is clicked
function restart(){
    // navigate to the start screen
    window.location.href = 'index.html';
    // ensure everything is hidden except start
    startScreen.classList.remove('hide');
    questionEl.classList.add('hide');
    allDone.classList.add('hide');
    // reset time
    timeLeft = 100;
    timeLeft.textContent = "Time: " + timeLeft;
}
