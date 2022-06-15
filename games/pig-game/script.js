'use strict';

// Selecting elements for scores
const player0El = document.querySelector('.player--0');
const score0El = document.querySelector('#score--0');
const current0El = document.getElementById('current--0');
const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--1');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winnerMessage = document.querySelector('.winner--message');

// Selecting elements for modals
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

//global variables
let scores, currentScore, activePlayer, playing;

//initialize game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  winnerMessage.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
};
init();

// Reusable functions
let switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `https://brphillis.github.io/games/pig-game/dice-${dice}.png`;
    // Check for rolled 1
    if (dice !== 1) {
      // Add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayers(`${activePlayer}`);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check score is at least 100
    if (scores[activePlayer] >= 50) {
      //finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      winnerMessage.classList.remove('hidden');
      winnerMessage.classList.add('show--winner');
      winnerMessage.textContent = `Player ${activePlayer + 1} Wins!`;
      //remove buttons
    } else {
      switchPlayers();
    }
  }
});

//new game button
btnNew.addEventListener('click', init);

// modal functions
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (escEvent) {
  if (escEvent.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
