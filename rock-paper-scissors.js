function playRound(playerSelection, computerSelection) {
   let result = null;

   // return error if parameters are not strings
   if (typeof playerSelection !== 'string' || 
       typeof playerSelection !== 'string') throw new Error('playRound expects strings as arguments');

   playerSelection = playerSelection.trim().toLowerCase();
   computerSelection = computerSelection.trim().toLowerCase();

   if (playerSelection === computerSelection) return null;

   switch (playerSelection) {
      case 'rock':
         if (computerSelection === 'scissors') result = true;
         if (computerSelection === 'paper') result = false;
         break;

      case 'scissors':
         if (computerSelection === 'rock') result = false;
         if (computerSelection === 'paper') result = true;
         break;

      case 'paper':
         if (computerSelection === 'rock') result = true;
         if (computerSelection === 'scissors') result = false;
         break;

      default:
         result = undefined;
   }

   return result;
}

function computerWeapon() {
   let weapons = ['rock', 'scissors', 'paper'];
   let randomNum = Math.floor(Math.random() * 3);

   return weapons[randomNum];
}

function game() {
   let playerScore = 0;
   let computerScore = 0;

   return function(playerSelection) {
      let computerSelection = computerWeapon();
      let round = playRound(playerSelection, computerSelection);
      
      if (playerScore === 5) { 
         console.log('Player got 5 points, player wins!');
         return;
      }
      if (computerScore === 5) {
         console.log('Computer got 5 points, computer wins!');
         return;
      }
   
      if (round) {
         playerScore++;
         console.log(`You win! ${playerSelection} beats ${computerSelection}`);
         console.log(`player score: ${playerScore} / computer score ${computerScore}`);
      } else if (round === null) {
         console.log(`${computerSelection} againts ${playerSelection}... Draw!`);
         console.log(`player score: ${playerScore} / computer score ${computerScore}`);
      } else if (round === false) {
         computerScore++;
         console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
         console.log(`player score: ${playerScore} / computer score ${computerScore}`);
      } else {
         console.log('rock, paper, and scissors are the only options you can pick!');
         console.log(`player score: ${playerScore} / computer score ${computerScore}`);
      }
   };
};