const questions = [
  {
    question: "What is the capital of the United States?",
    answers: ["New York", "Washington, D.C.", "Los Angeles", "Chicago"],
    correct: 1,
  },
  {
    question: "What is the capital of Japan?",
    answers: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
    correct: 1,
  },
  {
    question: "What is the capital of Germany?",
    answers: ["Munich", "Berlin", "Frankfurt", "Hamburg"],
    correct: 1,
  },
  {
    question: "What is the capital of Canada?",
    answers: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correct: 3,
  },
  {
    question: "What is the capital of Australia?",
    answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: 2,
  },
  {
    question: "What is the capital of Brazil?",
    answers: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correct: 2,
  },
  {
    question: "What is the capital of India?",
    answers: ["Mumbai", "New Delhi", "Bangalore", "Kolkata"],
    correct: 1,
  },
  {
    question: "What is the capital of France?",
    answers: ["Marseille", "Lyon", "Nice", "Paris"],
    correct: 3,
  },
  {
    question: "What is the capital of Russia?",
    answers: ["Moscow", "Saint Petersburg", "Kazan", "Sochi"],
    correct: 0,
  },
  {
    question: "What is the capital of South Africa?",
    answers: ["Cape Town", "Pretoria", "Johannesburg", "Durban"],
    correct: 1,
  },
];

let currentQuestionIndex = 0;
let answersArray = [];

//calling elements

const quizContainer = document.querySelector(".quiz-container");

const startQuizButton = document.querySelector(".start-quiz-button");

startQuizButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  answersArray = [];
  renderQuiz(questions, currentQuestionIndex);
});

const renderQuiz = (questionsArray, index) => {
  quizContainer.innerHTML = "";

  if (index >= questionsArray.length) {
    quizContainer.innerHTML = `
      <div class="question-container">
        <p class="question">Well done, you finished!</p>
      </div>
      <div class="navigation-container">
        <button class="review-button">Review Quiz</button>
      </div>
    `;

    const reviewButton = document.querySelector(".review-button");
    reviewButton.addEventListener("click", () => {
      renderReview();
    });
    return;
  }

  const question = questionsArray[index];

  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question-container");

  const questionCounter = document.createElement("p");
  questionCounter.classList.add("question-counter");
  questionCounter.textContent = `Question ${index + 1} of ${questions.length}`;

  const currentQuestion = document.createElement("p");
  currentQuestion.classList.add("question");
  currentQuestion.textContent = `${question.question}`;

  const answersContainer = document.createElement("div");
  answersContainer.classList.add(".answers-container");

  let selectedAnswerIndex = null;

  question.answers.forEach((answer, answerIndex) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("answer-button");
    answerButton.textContent = answer;

    answerButton.addEventListener("click", (e) => {
      selectedAnswerIndex = answerIndex;
      document
        .querySelectorAll(".answer-button")
        .forEach((button) => button.classList.remove("answer-button--active"));
      answerButton.classList.add("answer-button--active");
      nextButton.disabled = false;
    });
    answersContainer.appendChild(answerButton);
  });

  const navigationContainer = document.createElement("div");
  navigationContainer.classList.add("navigation-container");

  const nextButton = document.createElement("button");
  nextButton.classList.add("next-button");
  nextButton.textContent = "Next Question";
  if (index === questionsArray.length - 1) {
    nextButton.textContent = "Submit Quiz";
  } else {
    nextButton.textContent = "Next Question";
  }

  nextButton.disabled = true;

  nextButton.addEventListener("click", () => {
    answersArray.push({
      question: question.question,
      selected: selectedAnswerIndex,
      correct: question.correct,
    });

    currentQuestionIndex++;
    renderQuiz(questionsArray, currentQuestionIndex);
    console.log(answersArray);
  });

  //appending
  quizContainer.append(
    questionContainer,
    answersContainer,
    navigationContainer
  );
  questionContainer.append(questionCounter, currentQuestion);
  navigationContainer.append(nextButton);
};

const renderReview = () => {
  quizContainer.innerHTML = "<h2>Review Your Answers</h2>";

  answersArray.forEach((answerData, index) => {
    const reviewContainer = document.createElement("div");
    reviewContainer.classList.add("review-container");

    const questionText = document.createElement("p");
    questionText.textContent = `Q${index + 1}: ${answerData.question}`;

    const selectedAnswerText = document.createElement("p");
    selectedAnswerText.textContent = `Your answer: ${
      questions[index].answers[answerData.selected]
    }`;
    selectedAnswerText.style.color =
      answerData.selected === answerData.correct ? "green" : "red";

    const correctAnswerText = document.createElement("p");
    correctAnswerText.textContent = `Correct answer: ${
      questions[index].answers[answerData.correct]
    }`;

    reviewContainer.append(questionText, selectedAnswerText, correctAnswerText);
    quizContainer.appendChild(reviewContainer);
  });

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.classList.add("restart-button");
  restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    answersArray = [];
    renderQuiz(questions, currentQuestionIndex);
  });

  quizContainer.appendChild(restartButton);
};
