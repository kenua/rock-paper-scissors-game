/*
   MAKE UI INTERACTIVE

   1. 
   When the user clicks on a weapon, run game.play method and pass the 
   option that the user selected and hide that section. 

   2. 
   Once the app it's in the second screen, the text that says "Rock, Pape, Scissors!"
   should be animated to show the first word, then the second, then the third. After
   that the picked weapons by the user and computer fade in, then the scores are 
   updated and then the button to play again fades in. Everything should happen in 
   this speficic order.

   3. 
   If one of the players gets 5 points, the play again button text should say who
   won the game and the play again button should say reset game, also the reset
   button should disappear on this state.

   4.
   When one of the players gets 5 points, the text for the "play again" button
   should say who won the game.

   5.
   Update the code that makes the UI animation to have more control over it
   since the user can still click stuff get buggy animations.
*/
'use strict';

window.addEventListener('DOMContentLoaded', function() {
   const scoresContainer = document.getElementById('scores');
   const playerScore = document.getElementById('player-score');
   const cpuScore = document.getElementById('cpu-score');

   const optionsContainer = document.getElementById('options');
   const rockBtn = document.getElementById('rock-button');
   const paperBtn = document.getElementById('paper-button');
   const scissorsBtn = document.getElementById('scissors-button');

   const matchResultContainer = document.getElementById('match-result');
   const matchWeaponsContainer = document.getElementById('match-weapons');
   const playAgainContainer = document.getElementById('play-again');
   const animatedText = document.getElementById('animated-text');
   const rockText = animatedText.firstElementChild;
   const paperText = rockText.nextElementSibling;
   const scissorsText = animatedText.lastElementChild;
   const playerPickedImg = document.getElementById('player-picked__img');
   const cpuPickedImg = document.getElementById('cpu-picked__img');
   const winnerText =  document.getElementById('winner-text');
   const playAgainBtn = document.getElementById('play-again-button');
   const resetBtn = document.getElementById('reset-button');

   const fadeOut = {
      frames: [
         { opacity: 1, transform: 'translate(0px, 0px)', },
         { opacity: 0, transform: 'translate(0px, -100px)', },
      ],
      options: {
         duration: 700,
         easing: 'ease',
      },
   };
   const fadeIn = {
      frames: [
         { opacity: 0, transform: 'translate(0px, 100px)', },
         { opacity: 1, transform: 'translate(0px, 0px)', },
      ],
      options: {
         duration: 700,
         easing: 'ease',
      },
   };
   const blink = {
      frames: [
         { opacity: 0,},
         { opacity: 1,},
      ],
      options: {
         duration: 1,
         easing: 'linear',
         delay: 700,
      }
   }
   const bounce = {
      frames: [
         { transform:'translateY(0%)',   offset: 0.7 },
         { transform:'translateY(-20%)', offset: 0.8 },
         { transform:'translateY(0%)',   offset: 0.9 },
         { transform:'translateY(-5%)',  offset: 0.95},
         { transform:'translateY(0)', },
      ],
      options: {
         duration: 500,
         easing: 'ease-out',
      },
   };

   let matchResult;

   rockBtn.addEventListener('click', e => {
      e.preventDefault();
      pickWeapon('rock');
   });
   paperBtn.addEventListener('click', e => {
      e.preventDefault();
      pickWeapon('paper');
   });
   scissorsBtn.addEventListener('click', e => {
      e.preventDefault();
      pickWeapon('scissors');
   });
   resetBtn.addEventListener('click', resetGame);
   playAgainBtn.addEventListener('click', showOptions);

   async function pickWeapon (weapon) {
      matchResult = game.play(weapon);

      // hide options and show match result
      await optionsContainer.animate(fadeOut.frames, fadeOut.options).finished;
      optionsContainer.style.display = 'none';
      matchWeaponsContainer.style.opacity = 0;
      playAgainContainer.style.opacity = 0;
      playerPickedImg.src = `./images/${weapon}-icon.png`;
      cpuPickedImg.src = `./images/${matchResult.computerSelection}-icon.png`;

      if (matchResult.state === 'win') {
         winnerText.textContent = 'You win';
      } else if (matchResult.state === 'lose') {
         winnerText.textContent = 'You lose';
      } else if (matchResult.state === 'draw') {
         winnerText.textContent = 'Draw';
      } else if (matchResult.state === 'finish') {
         const { player: playerScore, computer: cpuScore } = game.getScores();
         const resultText = (playerScore > cpuScore) 
                           ? 'You got 5 points, you are the winner' 
                           : 'CPU got 5 points, CPU is the winner';

         winnerText.textContent = resultText;
         playAgainBtn.textContent = 'Reset Game';
      }

      matchResultContainer.style.display = 'block';

      // animate match result text
      rockText.style.opacity = 0;
      paperText.style.opacity = 0;
      scissorsText.style.opacity = 0;
      await rockText.animate(blink.frames, blink.options).finished;
      rockText.style.opacity = 1;
      await paperText.animate(blink.frames, blink.options).finished;
      paperText.style.opacity = 1;
      await scissorsText.animate(blink.frames, blink.options).finished;
      scissorsText.style.opacity = 1;

      await matchWeaponsContainer.animate(fadeIn.frames, {...fadeIn.options, delay: 700}).finished;
      matchWeaponsContainer.style.opacity = 1;

      // show winner
      await playAgainContainer.animate(fadeIn.frames, {...fadeIn.options, delay: 1400}).finished;
      playAgainContainer.style.opacity = 1;

      // update score
      if (matchResult.state !== 'draw') {
         await scoresContainer.animate(bounce.frames, bounce.options).finished;
         playerScore.textContent = game.getScores().player;
         cpuScore.textContent = game.getScores().computer;
      }
   }

   async function showOptions (e) {
      e.preventDefault();

      if (matchResult.state === 'finish') {
         resetGame();
         playAgainBtn.textContent = 'Play again';
      }

      await matchResultContainer.animate(fadeOut.frames, fadeOut.options).finished;
      matchResultContainer.style.display = 'none';
      optionsContainer.style.display = 'block';
      optionsContainer.style.opacity = 0;
      await optionsContainer.animate(fadeIn.frames, {...fadeIn.options}).finished;
      optionsContainer.style.opacity = 1;
   }

   async function resetGame () {
      game.resetScores();
      scoresContainer.animate(bounce.frames, bounce.options).finished;
      playerScore.textContent = 0;
      cpuScore.textContent = 0;

      await matchResultContainer.animate(fadeOut.frames, fadeOut.options).finished;
      matchResultContainer.style.display = 'none';
      optionsContainer.style.display = 'block';
      optionsContainer.style.opacity = 0;
      await optionsContainer.animate(fadeIn.frames, {...fadeIn.options}).finished;
      optionsContainer.style.opacity = 1;      
   }
});