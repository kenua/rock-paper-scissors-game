'use strict';

const playerWeaponDisplay = document.querySelector('#player-weapon-display');
const computerWeaponDisplay = document.querySelector('#computer-weapon-display');
const announcer = document.querySelector('#game-announcer');
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const rockBtn = document.querySelector('#rock-button');
const paperBtn = document.querySelector('#paper-button');
const scissorsBtn = document.querySelector('#scissors-button');

function printPlayersWeapons(playerW, computerW) {
   let playerImg = new Image();
   let computerImg = new Image();

   playerWeaponDisplay.innerHTML = '';
   computerWeaponDisplay.innerHTML = '';
   playerImg.src = `images/${playerW}.png`;
   computerImg.src = `images/${computerW}.png`;
   playerWeaponDisplay.append(playerImg);
   computerWeaponDisplay.append(computerImg);
}

function updateGameInfo(message) {
   let { player: pScore, computer: cScore } = game.getScores();

   announcer.textContent = message;
   playerScore.textContent = pScore;
   computerScore.textContent = cScore;
}

function takeTurn(weapon) {
   let playResult = game.play(weapon);
   let { player: pScore, computer: cScore } = game.getScores();

   console.log(pScore);
      console.log(cScore);

   if (pScore === 5 || cScore === 5) {
      updateGameInfo(playResult.string);
      return;
   }

   if (playResult.state === true || playResult.state === false || playResult.state === null) {
      printPlayersWeapons(playResult.playerW, playResult.computerW);
      updateGameInfo(playResult.string);
   }
}

rockBtn.addEventListener('click', () => takeTurn('rock'));
paperBtn.addEventListener('click', () => takeTurn('paper'));
scissorsBtn.addEventListener('click', () => takeTurn('scissors'));


