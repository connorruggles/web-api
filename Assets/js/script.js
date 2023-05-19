var timeEl = document.querySelector(".time");
var quizPage = document.querySelector(".quiz-container");
var highscorePage = document.querySelector(".highscore-container");
var mainEl = document.getElementById("main");
var startBtn = document.getElementById("start-btn");
var homePage = document.getElementById("home-container");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var feedback = document.querySelector(".feedback");
var scorecard = document.querySelector(".scorecard");
var answerBtn = document.querySelector(".answer-btn");
var saveScoreBtn = document.querySelector("#saveScoreBtn");
var highscoreForm = document.querySelector("#highscore-form");
var scorePageEl = document.querySelector(".scorePage");
var initialInput = document.querySelector("#submit-initials");
var tryAgainBtn = document.querySelector("#try-again");
var highscoreBtn = document.querySelector("#highscoreBtn");
var scoreBoardList = document.querySelector("#scoreBoard");
var refreshBtn = document.querySelector("#refresh");
var nextBtn = document.querySelector("#next-btn");

var questionArray = [
{
question:
"Which method adds a new item to the end of an array and returns the new length?",
options: ["shift()", "return()", "push()", "pop()"],
answer: 2,
},
{
question: "Which of the following is NOT a Git commd?",
options: ["pwd", "Rm -rf", "mkdir", "new"],
answer: 3,
},
{
question: "Which display styling hides an element from the page?",
options: ["none", "inline", "block", "empty"],
answer: 0,
},
{
question: "Which of the following is NOT a primitive type in JavaScript?",
options: ["string", "array", "boolean", "undefined"],
answer: 1,
},
{
question:
"After creating an element in JavaScript, to see it on the page you need to _________ .",
options: [
"document.getElementById",
"element.appendChild",
"element.textContent",
"element.setAttribute",
],
answer: 1,
},
];

var userAnswer = "";
var userScore = 0;
var secondsLeft = 75;
var questionIndex = 0;
var pentalty = 10;

answer1.addEventListener("click", function (event) {
event.preventDefault();
var correctAnswer = questionArray[questionIndex].answer;
if (0 === correctAnswer) {
feedback.textContent = "correct, proceed to next question";
userScore++;
scorecard.textContent = "your current score is " + userScore;
} else {
secondsLeft -= pentalty;
feedback.textContent = "incorrect, proceed to next question";
scorecard.textContent = "your current score is " + userScore;
}
});

answer2.addEventListener("click", function (event) {
event.preventDefault();
var correctAnswer = questionArray[questionIndex].answer;
if (1 === correctAnswer) {
feedback.textContent = "correct, proceed to next question";
userScore++;
scorecard.textContent = "your current score is " + userScore;
} else {
secondsLeft -= pentalty;
feedback.textContent = "incorrect, proceed to next question";
scorecard.textContent = "your current score is " + userScore;
}
});

answer3.addEventListener("click", function (event) {
event.preventDefault();
var correctAnswer = questionArray[questionIndex].answer;
if (2 === correctAnswer) {
feedback.textContent = "correct, proceed to next question";
userScore++;
scorecard.textContent = "your current score is " + userScore;
} else {
secondsLeft = secondsLeft - pentalty;
feedback.textContent = "incorrect, proceed to next question";
scorecard.textContent = "your current score is " + userScore;
}
});

answer4.addEventListener("click", function (event) {
event.preventDefault();
var correctAnswer = questionArray[questionIndex].answer;
if (3 === correctAnswer) {
feedback.textContent = "correct, proceed to next question";
userScore++;
scorecard.textContent = "your current score is " + userScore;
} else {
secondsLeft = secondsLeft - pentalty;
feedback.textContent = "incorrect, proceed to next question";
scorecard.textContent = "your current score is " + userScore;
}
});

function hideAnswer() {
answer1.style.display = "none";
answer2.style.display = "none";
answer3.style.display = "none";
answer4.style.display = "none";
nextBtn.style.display = "none";
}

function endQuiz() {
quizPage.style.display = "none";
renderEndPage();
}

function setTime() {
var timerInterval = setInterval(function () {
secondsLeft--;
if (secondsLeft === 0 || questionIndex >= questionArray.length) {
    clearInterval(timerInterval);
    endQuiz();
  }
timeEl.textContent = secondsLeft + " seconds remain";
}, 1000);
}

function hideHomepage() {
if (homePage.style.display === "none") {
homePage.style.display = "block";
} else {
homePage.style.display = "none";
}
answer1.style.display = "inline";
answer2.style.display = "inline";
answer3.style.display = "inline";
answer4.style.display = "inline";
nextBtn.style.display = "block";
}

function startQuestions(questionIndex) {
mainEl.innerHTML = "";
var questionContainer = document.createElement("div");
var question = document.createElement("h2");

question.textContent = questionArray[questionIndex].question;
answer1.textContent = questionArray[questionIndex].options[0];
answer2.textContent = questionArray[questionIndex].options[1];
answer3.textContent = questionArray[questionIndex].options[2];
answer4.textContent = questionArray[questionIndex].options[3];

mainEl.appendChild(questionContainer);
mainEl.appendChild(question);
}

nextBtn.addEventListener("click", function () {
questionIndex++;
startQuestions(questionIndex);
if (questionIndex < questionArray[questionIndex].length) {
endQuiz();
} else if (questionIndex >= questionArray.length) {
endQuiz();
clearInterval(timeInterval);
}
scorecard.textContent = "";
feedback.textContent = "";
});

hideAnswer();

startBtn.addEventListener("click", function () {
hideHomepage();
setTime();
startQuestions(questionIndex);
});

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

saveScoreBtn.addEventListener("click", function (event) {
event.preventDefault();

var initials = initialInput.value.trim();
var finalScore = { initials, userScore };

highscores.push(finalScore);
localStorage.setItem("highscores", JSON.stringify(highscores));
});

var renderEndPage = function () {
highscorePage.style.display = "block";
scorePageEl.style.display = "block";
var scoreHeader = document.createElement("h2");
var scoreReport = document.createElement("p");
scoreHeader.textContent = "Game Over";
scoreReport.textContent = "Your final score is " + userScore;
highscorePage

.append(scoreHeader);
highscorePage.append(scoreReport);
};

var hideEndPage = function () {
highscorePage.style.display = "none";
scorePageEl.style.display = "none";
refreshBtn.style.display = "none";
};

hideEndPage();

tryAgainBtn.addEventListener("click", function () {
location.reload();
});

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

highscoreBtn.addEventListener("click", function () {
hideEndPage();
renderScore();
});

var renderScore = function () {
highscores = sortScores(highscores, "userScore");
var scoreTitle = document.createElement("h2");
scoreBoardList.appendChild(scoreTitle);
scoreTitle.textContent = "Highscores";
for (var i = 0; i < highscores.length; i++) {
console.log(highscores[i].userScore);
var newLi = document.createElement("li");
newLi.textContent = highscores[i].initials + ": " + highscores[i].userScore;
scoreBoardList.appendChild(newLi);
}
refreshBtn.style.display = "block";
};

var sortScores = function (array, key) {
return array.sort(function (a, b) {
if (a.userScore < b.userScore) {
return 1;
}
return -1;
});
};

refreshBtn.addEventListener("click", function () {
location.reload();
});