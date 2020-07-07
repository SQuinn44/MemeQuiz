const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
 
let questions = [
   {
       question: "Road work ahead? Uhh _____",
       choice1: "obviously! Its 435!",
       choice2: "yeah, I sure hope it does!",
       choice3: "why",
       choice4: "look at all those potholes.",
       answer: 2
   },
   {
       question: "I smell like ______",
       choice1: "tuna",
       choice2: "wet dog",
       choice3: "beef",
       choice4: "grandma",
       answer: 3
   },
   {
       question: "Oh my God they were _____",
       choice1: "room mates",
       choice2: "sisters",
       choice3: "cousins",
       choice4: "besties",
       answer: 1
   },
   {
       question: "Stop I could have dropped my _____",
       choice1: "taco",
       choice2: "burger",
       choice3: "croissant",
       choice4: "ramen",
       answer: 3
   },
   {
       question: "That was _____",
       choice1: "dopeness",
       choice2: "radicality",
       choice3: "extremity",
       choice4: "legitness",
       answer: 4
   },
   {
       question: "Look at all those _____",
       choice1: "llamas",
       choice2: "geese",
       choice3: "zebras",
       choice4: "chickens",
       answer: 4
   },
   {
       question: "Hi, welcome to ______",
       choice1: "Chili's",
       choice2: "Heaven",
       choice3: "Chick-fil-A",
       choice4: "Wendy's",
       answer: 1
   },
   {
       question: "HAPPY BIRTHDAY RAVEN!",
       choice1: "Where's Grandma?",
       choice2: "I can't swim",
       choice3: "I'm in the bathroom",
       choice4: "Help",
       answer: 2
   },
   {
       question: "Girl come see this, they got a ______ exhibit.",
       choice1: "dinosaur",
       choice2: "pop-tart",
       choice3: "ramen noodle",
       choice4: "Jesus",
       answer: 3
   },
   { 
       question: "It's Crismon, Merry Crisis, ________ ",
       choice1: "Merry Chrysler",
       choice2: "Happy Crinsmons",
       choice3: "Merry Crysing",
       choice4: "Happy Krampus",
       answer: 1
   }
 
]
 
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
 
startGame = () => {
   questionCounter = 0;
   score = 0;
   availableQuestions = [ ... questions];
   getNewQuestion();
};
 
getNewQuestion = () => {
 
           if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
               localStorage.setItem('mostRecentScore', score);
               //go to the end page
               return window.location.assign("end.html");
           }
       questionCounter++;
       progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
       //Update the progress bar
       progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
 
       const questionIndex = Math.floor(Math.random() * availableQuestions.length);
       currentQuestion = availableQuestions[questionIndex];
       question.innerText = currentQuestion.question;
 
       choices.forEach(choice => {
           const number = choice.dataset["number"];
           choice.innerText = currentQuestion["choice" + number];
       });
 
       availableQuestions.splice(questionIndex, 1);
       acceptingAnswers = true;
};
 
choices.forEach(choice => {
   choice.addEventListener('click', e => {
       if (!acceptingAnswers) return;
 
       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer= selectedChoice.dataset["number"];
 
       const classToApply =
           selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
 
           if(classToApply == 'correct') {
               incrementScore(CORRECT_BONUS);
           }
 
       selectedChoice.parentElement.classList.add(classToApply);
 
       setTimeout(() => {
           selectedChoice.parentElement.classList.remove(classToApply);
           getNewQuestion();
       }, 1000);
   });
});
 
incrementScore = num => {
   score +=num;
   scoreText.innerText = score;
}
 
startGame();

