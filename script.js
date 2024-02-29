const questions = [
  {
    question: "Which animal can be seen on the Porsche logo?",
    options: ["Horse", "Girrafe", "cat", "dog"],
    correctAnswer: "Horse"
  },
  {
    question: "What does BMW stand for (in English)?",
    options: ["Blue Motors", "Bavarians", "Bavarian Motor Works", "Works"],
    correctAnswer: "Bavarian Motor Works"
  },

  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the capital of Abia?",
    options: ["Asaba", "Umuhaia", "Jupiter", "Saturn"],
    correctAnswer: "Umuhaia"
  },
  {
    question: "One of the following is a type of rock in Nigeria?",
    options: ["UK rock", "Yankee rock", "Zuma rock", "England Rock"],
    correctAnswer: "Zuma rock"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },

  {
    question:  "What is the tallest mammal?",
    options: ["Giraffe", "Elephant", "Rhino", "Hippo"],
    correctAnswer: "Giraffe"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Dollar", "Yen", "Euro", "Pound"],
    correctAnswer: "Yen"
  },

  {
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
    correctAnswer: "Albert Einstein"
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Vatican City", "Monaco", "Maldives", "Tuvalu"],
    correctAnswer: "Vatican City"
  },
  {
    question: "What is the largest land animal?",
    options: ["Elephant", "Hippo", "Rhino", "Giraffe"],
    correctAnswer: "Elephant"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Korea", "Vietnam"],
    correctAnswer: "Japan"
  },

  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Diamond", "Platinum", "Silver"],
    correctAnswer: "Diamond"
  },
  // Add more questions as needed
];

let currentQuestionIndex = 0;
let usedFiftyFifty = false;
let usedAskAudience = false;

const currentPrize = document.getElementById("current-prize");





function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Display the current question and options
  document.getElementById("question").innerText = currentQuestion.question;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.innerText = option;
    optionElement.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(optionElement);
  });

  // Display the current prize in the prize list
  updatePrizeList(currentQuestionIndex);
}

function updatePrizeList(correctAnswers) {
  // Get the prize list elements
  const prizeListItems = document.getElementById("prize-list").getElementsByTagName("li");
  currentPrize.textContent = `$${Number(currentPrize.innerHTML.replace("$","").replace(",","")) + Number(prizeListItems[currentQuestionIndex].innerHTML.replace("$","").replace(",",""))}`

  // Remove any existing highlighting
  for (let i = 0; i < prizeListItems.length; i++) {
    prizeListItems[i].classList.remove("highlighted");
  }

  // Highlight the current prize level
  if (correctAnswers < prizeListItems.length) {
    prizeListItems[correctAnswers].classList.add("highlighted");
    //prizeListItems[correctAnswers].innerText += ` - ${questions[correctAnswers].prize}`;
  }

  // Check if 50/50 lifeline has been used, and if not, display the lifeline button
  if (!usedFiftyFifty) {
    document.getElementById("fifty-fifty-btn").style.display = "inline-block";
  } else {
    document.getElementById("fifty-fifty-btn").style.display = "none";
  }


  // Check if Ask the Audience lifeline has been used, and if not, display the lifeline button
  if (!usedAskAudience) {
    document.getElementById("ask-audience-btn").style.display = "inline-block";
  } else {
    document.getElementById("ask-audience-btn").style.display = "none";
  }
}

function checkAnswer(userAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  if (userAnswer === currentQuestion.correctAnswer) {
    
  } else {
    // If the user answers any question from 1 to 5 incorrectly, set points to 0
    if (currentQuestionIndex < 5) {
      document.getElementById("game-over-container").style.display = "block";
      document.getElementById("final-score").innerText = `You earned 0 Naira.`;

      resetGame();

      document.getElementById("game-over-container").style.display = "block";
      document.getElementById("final-score").innerText = `You earned 0 Naira.`;
      return;

    }
    
    
    // Display the current prize in the prize list before showing "Game Over" message
    updatePrizeList(currentQuestionIndex);
    // You can implement additional logic for game over or other actions here

    
    // If the user answers any question from 1 to 5 incorrectly, set points to 5,000
    if (currentQuestionIndex >= 5 && currentQuestionIndex <= 10) {
      fivetoten();
      resetGame();
      fivetoten();
      return; // Stop further execution to prevent loading the next question
    }

    // If the user answers any question from 1 to 5 incorrectly, set points to 10,000
    if (currentQuestionIndex >= 11 && currentQuestionIndex < 15) {
      eleventofifteen();
      resetGame();
      eleventofifteen();
      return; // Stop further execution to prevent loading the next question
    }
  }

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    // Game completed
    //alert("Congratulations! You completed the game.");
    // Display the final prize in the prize list after completing the game
    updatePrizeList(currentQuestionIndex - 1);
    displayFinalPrize(); // New function to display the final prize
    // You can implement logic for completing the game here
  }
}

function displayFinalPrize() {
  const currentQuestion = questions[currentQuestionIndex];

  // Display "Congratulations" on the webpage
  document.getElementById("game-over-container").style.display = "block";
  document.getElementById("final-score").innerText = `Congratulations, You completed the game and you earned ${currentQuestionIndex*1000} Naira.`;

  // Highlight the corresponding prize level in the list
  highlightPrizeLevel(currentQuestionIndex);
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    alert("No more questions available.");
  }
}

function useFiftyFifty() {
  const currentQuestion = questions[currentQuestionIndex];

  // Randomly select two incorrect options to hide
  const incorrectOptions = currentQuestion.options.filter(option => option !== currentQuestion.correctAnswer);
  const randomIncorrectOptions = getRandomElements(incorrectOptions, 1);

  // Display the question and the remaining options
  document.getElementById("question").innerText = currentQuestion.question;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    // Check if the option is one of the remaining options after 50/50
    if (randomIncorrectOptions.includes(option) || option === currentQuestion.correctAnswer) {
      const optionElement = document.createElement("div");
      optionElement.className = "option";
      optionElement.innerText = option;
      optionElement.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(optionElement);
    }
  });

  // Mark the 50/50 lifeline as used
  usedFiftyFifty = true;

  // Hide the lifeline button after using it
  document.getElementById("fifty-fifty-btn").style.display = "none";
}

// Helper function to get random elements from an array
function getRandomElements(array, numElements) {
  const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, numElements);
}


function askAudience() {
  if (usedAskAudience) {
    alert("You have already used the Ask Audience lifeline.");
    return;
  }

  // Simulate audience opinion (you can replace this with your logic)
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  const audienceOpinions = simulateAudienceOpinions(correctAnswer);

  // Display audience opinions
  displayAudienceOpinions(audienceOpinions);

  // Mark the Ask Audience lifeline as used
  usedAskAudience = true;
  document.getElementById("ask-audience-btn").style.display = "none";
}

function simulateAudienceOpinions(correctAnswer) {
  const options = questions[currentQuestionIndex].options;
  const audienceOpinions = {};

  // Assign a random percentage to the correct answer
  audienceOpinions[correctAnswer] = Math.floor(Math.random() * 51) + 50; // Random percentage between 50% and 100%

  // Distribute the remaining percentage evenly among the wrong answers
  const wrongOptions = options.filter(option => option !== questions[currentQuestionIndex].correctAnswer);
  const totalWrongOptions = wrongOptions.length;

  // Calculate the percentage to distribute evenly among wrong answers
  const remainingPercentage = 100 - audienceOpinions[correctAnswer];

  // Calculate the base percentage for each wrong answer
  const basePercentage = Math.floor(remainingPercentage / totalWrongOptions);

  // Calculate the remaining percentage after distributing the base percentage
  const remainingPercentageAfterDistribution = remainingPercentage - (basePercentage * totalWrongOptions);

  // Assign base percentage to each wrong answer
  wrongOptions.forEach(option => {
    audienceOpinions[option] = basePercentage;
  });

  // Distribute the remaining percentage after rounding down
  for (let i = 0; i < remainingPercentageAfterDistribution; i++) {
    const randomOption = wrongOptions[Math.floor(Math.random() * totalWrongOptions)];
    audienceOpinions[randomOption]++;
  }

  return audienceOpinions;
}


function displayAudienceOpinions(audienceOpinions) {
  const audienceOptionsContainer = document.getElementById("audience-options");
  audienceOptionsContainer.innerHTML = ""; // Clear previous content

  for (const option in audienceOpinions) {
    const percentage = audienceOpinions[option];
    const optionElement = document.createElement("div");
    optionElement.className = "audience-option";
    optionElement.innerText = `${option}: ${percentage}%`;
    audienceOptionsContainer.appendChild(optionElement);
  }

  // Display the audience opinion container
  document.getElementById("audience-container").style.display = "block";
}

function fivetoten() {
  const currentQuestion = questions[currentQuestionIndex];

  // Display "Game Over" on the webpage
  document.getElementById("game-over-container").style.display = "block";
  document.getElementById("final-score").innerText = `You earned 5,000 Naira.`;

  // Highlight the corresponding prize level in the list
  highlightPrizeLevel(currentQuestionIndex);

}


function eleventofifteen() {
  const currentQuestion = questions[currentQuestionIndex];

  // Display "Game Over" on the webpage
  document.getElementById("game-over-container").style.display = "block";
  document.getElementById("final-score").innerText = `You earned 10,000 Naira.`;

  // Highlight the corresponding prize level in the list
  highlightPrizeLevel(currentQuestionIndex);

}


function walkAway() {
  const currentQuestion = questions[currentQuestionIndex];

  // Display "Game Over" on the webpage
  document.getElementById("game-over-container").style.display = "block";
  document.getElementById("final-score").innerText = `You earned ${currentQuestionIndex*1000} Naira.`;

  // Highlight the corresponding prize level in the list
  highlightPrizeLevel(currentQuestionIndex);

}


function highlightPrizeLevel(correctAnswers) {
  // Get the prize list elements
  const prizeListItems = document.getElementById("prize-list").getElementsByTagName("li");

  // Remove any existing highlighting
  for (let i = 0; i < prizeListItems.length; i++) {
    prizeListItems[i].classList.remove("highlighted");
  }

  // Highlight the current prize level
  if (correctAnswers < prizeListItems.length) {
    prizeListItems[correctAnswers].classList.add("highlighted");
  }
}


function reloadPage() {
  location.reload();
}

// Load the first question when the page loads
loadQuestion();







