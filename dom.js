'use strict';

const playerWeaponDisplay = document.querySelector('#player-weapon-display');
const computerWeaponDisplay = document.querySelector('#computer-weapon-display');
const announcer = document.querySelector('#game-announcer');
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const rockBtn = document.querySelector('#rock-button');
const paperBtn = document.querySelector('#paper-button');
const scissorsBtn = document.querySelector('#scissors-button');
const resetBtn = document.querySelector('#reset-button');
let gameOver = false;

function printWeapons(playerSelection, computerSelection) {
   let playerImg = new Image();
   let computerImg = new Image();

   playerWeaponDisplay.innerHTML = '';
   computerWeaponDisplay.innerHTML = '';
   playerImg.src = `images/${playerSelection}.png`;
   computerImg.src = `images/${computerSelection}.png`;
   playerWeaponDisplay.append(playerImg);
   computerWeaponDisplay.append(computerImg);
}

function updateGameInfo(message) {
   let { player: pScore, computer: cScore } = game.getScores();

   announcer.textContent = message;
   playerScore.textContent = pScore;
   computerScore.textContent = cScore;
}

function playMatch(playerSelection) {
   if (!gameOver) {
      let matchResult = game.play(playerSelection);   

      printWeapons(matchResult.playerSelection, matchResult.computerSelection);
      updateGameInfo(matchResult.message);

      if (matchResult.state === 'finish') {
         gameOver = true;
         rockBtn.disabled = true;
         paperBtn.disabled = true;
         scissorsBtn.disabled = true;
         resetBtn.style.visibility = 'visible';
      }
   }
}

function resetGame() {
   game.reset();
   gameOver = false;
   playerWeaponDisplay.innerHTML = '';
   computerWeaponDisplay.innerHTML = '';
   announcer.textContent = '...';
   playerScore.textContent = 0;
   computerScore.textContent = 0;
   rockBtn.disabled = false;
   paperBtn.disabled = false;
   scissorsBtn.disabled = false;
   resetBtn.style.visibility = 'hidden';
}

rockBtn.addEventListener('click', () => playMatch('rock'));
paperBtn.addEventListener('click', () => playMatch('paper'));
scissorsBtn.addEventListener('click', () => playMatch('scissors'));
resetBtn.addEventListener('click', resetGame);

