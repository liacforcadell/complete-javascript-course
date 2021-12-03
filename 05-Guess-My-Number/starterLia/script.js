'use strict';

//SECCION
//DOM MANIPULATION

//NOTA Selecting an html element in javascript
//Inside the querySelector we pass in a String selector (in this case, the name of the html class)
//Obs: we can pass the name of the class or the name of the ID(.message or #message)
// document.querySelector('.message');

// //Selecting the text content of the element. We can use the textContent property

// console.log(document.querySelector('.message').textContent);

//WHAT IS THE DOM? (It stands for Document Object Model) It is a structured representation of HTML documents. It allows javascript to access html elements and styles to manipulate them. (example: change text, html attributes, and even CSS styles)
//A DOM is connection point between HTML documents and Javascript code. The DOM is automatically created by the browser as soon as the HTML page loads. It stores the html elements in a tree structure.
//The parent of all is the DOCUMENT OBJECT, his child will be the html element and his grandchildren will be head and body html elements,...

//NOTA DOCUMENT OBJECT
//this Document Object is a special object that is the entry point to the DOM. Example: document.querySelector();

//The DOM has nodes for all the elements of the HTML page, but it also has nodes for all the text, comments, etc. Whatever is in the HTML document also has to be in the DOM.

//The DOM is a complete representation of the HTML Document, so we can manipulate it in complex ways.

//IMPORTANTE
//DOM methods and Properties of DOM manipulation  Example: document.querySelector(), ARE NOT PART OF JAVASCRIPT. They are part of the Web APIs, (librarys that browser implement and that we can acsess from Javascript.

//What is the DOM manipulation? Is making javascript interact with the webpage of the very first time.

// //SECCION
// //SELECTING AND MANIPULATION ELEMENTS
// //Changing the text content of an html element
// document.querySelector('.message').textContent = '🎉 Correct Number!';

// document.querySelector('.number').textContent = 13;

// document.querySelector('.score').textContent = 10;

// //Selecting content of input html element
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

//NOTA
//Handling CLICK EVENTS (using an event listener)
//1. First select the element where the event should happen
//2. Call the addEventListener method
//3. Arguments: type of the event, specify the reaction to the event (with a function EventHandler). Obs: addEventListener expects the second argument to be the function EventHandler

// let secretNumber = Math.trunc(Math.random() * 20) + 1;
// let highestScore = 0;
// let score = 20;

// document.querySelector('.check').addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value);
//   //console.log(guess, typeof guess);

//   //When there is no input
//   if (!guess) {
//     document.querySelector('.message').textContent = '⛔ No number!';

//     //When guess is different
//   } else if (guess !== secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent =
//         guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
//       score--;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = '💥 You lost the game!';
//       document.querySelector('.score').textContent = 0;
// }
//   } else if (guess > secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = '📈 Too High!';
//       score--;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = '💥 You lost the game!';
//       document.querySelector('.score').textContent = 0;
//     }

//     //When guess is too low
//   } else if (guess < secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = '📉 Too Low!';
//       score--;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = '💥 You lost the game!';
//       document.querySelector('.score').textContent = 0;
//     }

//     //When player wins
//   } else if (guess === secretNumber) {
//     document.querySelector('.message').textContent = '🎉 Correct Number!';

//     document.querySelector('.number').textContent = secretNumber;

//     //Changing CSS style by manipulating the DOM
//     //The - from the properties in CSS are replaced by CammelCase in javascript
//     //We need to specify value in a string
//     //When we use this, it adds the css as an inline style in the html document
//     document.querySelector('body').style.backgroundColor = '#60b347';
//     document.querySelector('.number').style.width = '30rem';
//     if (highestScore < score) {
//       highestScore = score;
//       document.querySelector('.highscore').textContent = highestScore;
//     }
//   }
// });

//CODING CHALLENGE #1

// document.querySelector('.again').addEventListener('click', function () {
//   score = 20;
//   secretNumber = Math.trunc(Math.random() * 20) + 1;

//   document.querySelector('.message').textContent = 'Start guessing...';
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('.score').textContent = score;
//   document.querySelector('.guess').value = '';

//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.number').style.width = '15rem';
// });

//SECCION
//REFACTORING OUR CODE: THE DRY PRINCIPLE
//1. Identify duplicate or almost duplicate code
//1.5 See code in 'When guess is different'
//2. A good refactoring technique is to create functions.

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highestScore = 0;
let score = 20;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

const changeCSS = function (color, width) {
  document.querySelector('body').style.backgroundColor = `${color}`;
  document.querySelector('.number').style.width = `${width}`;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //When there is no input
  if (!guess) {
    displayMessage('⛔ No number!');

    //When guess is different
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      displayScore(score);
    } else {
      displayMessage('💥 You lost the game!');
      displayScore(0);
    }

    //When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');

    displayNumber(secretNumber);

    changeCSS('#60b347', '30rem');

    if (highestScore < score) {
      highestScore = score;
      document.querySelector('.highscore').textContent = highestScore;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  displayScore(score);
  displayNumber('?');
  document.querySelector('.guess').value = '';

  changeCSS('#222', '15rem');
});
