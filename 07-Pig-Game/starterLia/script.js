'use strict';

let scores, currentScore, activePlayer, playing;

//Selecting Elements
const imageDice = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//Buttons
const btnNewGame = document.querySelector('.btn--new');
const btnNewRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Players
//Player #1
const totalScorePlayer0 = document.getElementById('score--0');
const currentScorePlayer0 = document.querySelector('#current--0');

//Player #2
const totalScorePlayer1 = document.querySelector('#score--1');
const currentScorePlayer1 = document.querySelector('#current--1');

//INICIALIZATION
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  totalScorePlayer0.textContent = 0;
  totalScorePlayer1.textContent = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;

  imageDice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

//Init
init();

//NOTA
//We have another way of selecting an element by ID, by calling the method of getElementbyID instead of using the querySelector(). We dont need to write the # because we are not writing a selector, we are only passing the name of the ID that we are getting
//getElementbyID is supposed to be a little bit faster than the querySelector

// const changeTotalScore = function (score1, score2) {
//   totalScorePlayer1.textContent = score1;
//   totalScorePlayer2.textContent = score2;
// };

// changeTotalScore(ScorePlayer1, ScorePlayer2);
// imageDice.remove();

//Rolling dice Functionality
// let numberDice = function () {
//   const number = Math.trunc(Math.random() * 6) + 1;
//   //console.log(number);
// };

// btnNewRollDice.addEventListener('click', numberDice);

// btnNewRollDice.addEventListener('click', function () {
//   // 1.Generating a random number
//   const number = Math.trunc(Math.random() * 6) + 1;
//   // 2.Display the dice
//   imageDice.classList.remove('hidden');
//   //IMPORTANTE
//   imageDice.src = `dice-${number}.png`;
//   //3.Check for a rolled 1
//   if (number !== 1) {
//     //Add the dice to the current score
//     currentScore += number;
//     player1.classList.contains('player--active')
//       ? (currentScorePlayer1.textContent = currentScore)
//       : (currentScorePlayer2.textContent = currentScore);
//   } else {
//     //Switch to next player
//     currentScore = 0;
//     if (player1.classList.contains('player--active')) {
//       player1.classList.remove('player--active');
//       player2.classList.add('player--active');
//       currentScorePlayer1.textContent = currentScore;
//     } else {
//       player2.classList.remove('player--active');
//       player1.classList.add('player--active');
//       currentScorePlayer2.textContent = currentScore;
//     }
//   }
// });

//IMPORTANTE
//Using the toggleAttribute method. It will add a class if it is not there and it will remove the class if it is present.

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnNewRollDice.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random number
    const number = Math.trunc(Math.random() * 6) + 1;
    // 2.Display the dice
    imageDice.classList.remove('hidden');
    imageDice.src = `dice-${number}.png`;
    //3.Check for a rolled 1
    if (number !== 1) {
      //Add the dice to the current score
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. If Score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      imageDice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
    } //Switch Player
    else switchPlayer();
  }
});

// btnNewGame.addEventListener('click', function () {
//   playing = true;
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   currentScore = 0;
//   document.getElementById(`current--${activePlayer}`).textContent =
//     currentScore;
//   if (!imageDice.classList.contains('hidden'))
//     imageDice.classList.add('hidden');
//   if (!player0.classList.contains('active--player')) {
//     player0.classList.toggle('player--active');
//     player1.classList.toggle('player--active');
//   }
//   totalScorePlayer0.textContent = 0;
//   totalScorePlayer1.textContent = 0;
//   scores[0] = 0;
//   scores[1] = 0;
// });

//IMPORTANTE
btnNewGame.addEventListener('click', init);
