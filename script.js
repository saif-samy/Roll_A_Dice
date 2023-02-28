'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer1El = document.getElementById('score--0');
const scorePlayer2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn-new');
const btnRollEl = document.querySelector('.btn-roll');
const btnHoldEl = document.querySelector('.btn-hold');
const currentScorePlayer0El = document.getElementById('current--0');
const currentScorePlayer1El = document.getElementById('current--1');
const cardEL = document.querySelector('.card');
const closeBtnEl = document.querySelector('.close-btn');
const overlayEl = document.querySelector('.overlay');

// Starting Conditions
let playing, currentScore, scores, activePlayer;

const init = function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;

  scorePlayer1El.textContent = 0;
  scorePlayer2El.textContent = 0;
  currentScorePlayer0El.textContent = 0;
  currentScorePlayer1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const closeCard = function () {
  cardEL.classList.add('hidden');
  overlayEl.classList.add('hidden');
};

// Rolling Dice Functionality
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // 1- Generating a random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2- Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${diceNumber}.png`;

    // 3- Check for rolled 1: if true, switch to next player
    if (diceNumber !== 1) {
      // Add dice number to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Button Hold Functionality
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // 1- Add current score to the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2- Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
    // Switch to next player
    else {
      switchPlayer();
    }
  }
});

// Reset game functionality
btnNewEl.addEventListener('click', init);

// Close Btn functionality
closeBtnEl.addEventListener('click', closeCard);

// overlay functionality
overlayEl.addEventListener('click', closeCard);

// Escape key functionality

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeCard();
});
