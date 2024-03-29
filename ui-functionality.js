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

   let canClick = true;
   const animation = {
      fadeOut({node, delay, options}) {
         return new Promise((res, rej) => {
            const fade = (element) => {
               if (element.style.opacity === '0') {
                  for (let key in options) {
                     element.style[key] = options[key];
                  }
                  
                  canClick = true;
                  return res('done');
               }
            
               if (!element.style.opacity) {
                  element.style.opacity = 1;
               } else {
                  let opacityValue = +element.style.opacity;
                  element.style.opacity = opacityValue -  0.05;
               }
      
               requestAnimationFrame(() => fade(element));
            };
            
            canClick = false;
            setTimeout(() => fade(node), delay);
         });
      },
      fadeIn({node, delay}) {
         return new Promise((res, rej) => {
            const animate = (element) => {
               let opacityValue = +element.style.opacity;
               let translateValue = +element.style.transform.match(/\d+/)[0];
   
   
               if (+element.style.opacity < 1) {
                  opacityValue = opacityValue + 0.05;
                  element.style.opacity = opacityValue;
               }
   
               if (translateValue > 0) {
                  translateValue = translateValue - 5;
                  element.style.transform = `translateY(${translateValue}px)`;
               }
   
               if (opacityValue === 1 && translateValue === 0) {
                  canClick = true;
                  return res('done');
               }
      
               requestAnimationFrame(() => animate(element));
            };
            
            canClick = false;
            node.style.opacity = 0;
            node.style.transform = 'translateY(100px)';
            setTimeout(() => animate(node), delay);
         });
      },
      blink({node, delay, options}) {
         return new Promise((res, rej) => {
            const animate = (element) => {
                  element.style.opacity = 1;
               
                  for (let key in options) {
                     element.style[key] = options[key];
                  }

                  canClick = true;
                  return res('done');
            };

            canClick = false;
            node.style.opacity = 0;
            setTimeout(() => animate(node), delay);
         });
      },
   };

   let matchResult;

   window.addEventListener('click', e => {
      if (!canClick) {
         e.stopImmediatePropagation();
         e.preventDefault();
      }
   }, {
      capture: true,
   });
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
      await animation.fadeOut({
         node: optionsContainer,
         options: {
            display: 'none',
         },
      });

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
                           ? 'You got 5 points,<br> you are the winner' 
                           : 'CPU got 5 points,<br> CPU is the winner';

         winnerText.innerHTML = resultText;
         playAgainBtn.textContent = 'Reset Game';
      }

      matchResultContainer.style.display = 'block';

      // animate match result text
      rockText.style.opacity = 0;
      paperText.style.opacity = 0;
      scissorsText.style.opacity = 0;
      await animation.blink({
         node: rockText,
         delay: 700,
      });
      await animation.blink({
         node: paperText,
         delay: 700,
      });
      await animation.blink({
         node: scissorsText,
         delay: 700,
      });
      await animation.fadeIn({
         node: matchWeaponsContainer,
         delay: 700,
      });

      // show winner
      await animation.fadeIn({
         node: playAgainContainer,
         delay: 1400,
      });

      // update score
      if (matchResult.state !== 'draw') {
         playerScore.textContent = game.getScores().player;
         cpuScore.textContent = game.getScores().computer;
      }
   }

   async function showOptions (e) {
      e.preventDefault();

      if (matchResult.state === 'finish') {
         resetGame();
         playAgainBtn.textContent = 'Play again';
         return;
      }

      await animation.fadeOut({
         node: matchResultContainer,
         options: {
            display: 'none',
            opacity: 1,
         },
      });
      
      optionsContainer.style.display = 'block';
      
      await animation.fadeIn({
         node: optionsContainer,
      });
   }

   async function resetGame () {
      game.resetScores();
      playerScore.textContent = 0;
      cpuScore.textContent = 0;

      await animation.fadeOut({
         node: matchResultContainer,
         options: {
            display: 'none',
            opacity: 1,
         },
      });
      optionsContainer.style.display = 'block';
      animation.fadeIn({
         node: optionsContainer,
         options: {
            opacity: 1,
         },
      });
   }
});