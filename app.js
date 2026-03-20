// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
        question: "In which year did Virat Kohli score his first Test double century?",
        answers: [
            {text: "2014", correct: false},
            {text: "2015", correct: false},
            {text: "2016", correct: true},
            {text: "2017", correct: false},
        ],
    },
    {
        question: "Against which team did Virat Kohli make his ODI debut?",
        answers: [
            {text: "Sri Lanka", correct: false},
            {text: "Pakistan", correct: false},
            {text: "England", correct: false},
            {text: "Bangladesh", correct: true},
        ],
    },
    {
        question: "What was Virat Kohli’s score in his maiden Test century?",
        answers: [
            {text: "107", correct: false},
            {text: "116", correct: true},
            {text: "119", correct: false},
            {text: "123", correct: false},
        ],
    },
    {
        question: "In which IPL season did Virat Kohli score a record-breaking 973 runs?",
        answers: [
            {text: "2015", correct: false},
            {text: "2016", correct: true},
            {text: "2017", correct: false},
            {text: "2018", correct: false},
        ],
    },
    {
        question: "Which stadium is known for Virat Kohli’s iconic 183-run knock against Pakistan in Asia Cup 2012?",
        answers: [
            {text: "Eden Gardens", correct: false},
            {text: "Sher-e-Bangla Stadium", correct: true},
            {text: "Adelaide Oval", correct: false},
            {text: "Dubai International Stadium", correct: false},
        ],
    },
]

// Quiz state vars

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listener
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    answersDisabled = false;

    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    // explain this in a second
    answerContainer.innerHTML = "";
 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // What is dataset?  it is a property of the button element that allows you to store custom data 
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer)

        answerContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if(answersDisabled) return;
    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // explain in a sec
    Array.from(answerContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        else{
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        // check if there are more questions or if quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        }
        else{
            showResults()
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if(percentage === 100){
        resultMessage.textContent = "Perfect! You're a genius";
    }
    else if(percentage >= 80){
        resultMessage.textContent = "Great job! You know your stuff!";
    }
    else if(percentage >= 60){
        resultMessage.textContent = "Good effort! Keep learning!";
    }
    else if(percentage >= 40){
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz(){
    console.log("Restart clicked"); // 👈 check this

    currentQuestionIndex = 0;
    score = 0;
    answersDisabled = false;

    scoreSpan.textContent = 0;
    progressBar.style.width = "0%";

    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}