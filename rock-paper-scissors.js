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

const game = (function() {
   let _playerScore = 0;
   let _computerScore = 0;

   const getScores = function() {
      return {
         player: _playerScore,
         computer: _computerScore,
      };
   };

   const play = function(playerSelection) {
      let computerSelection = computerWeapon();
      let roundResult = playRound(playerSelection, computerSelection);
      let result = {
         playerW: playerSelection,
         computerW: computerSelection,
         state: roundResult,
      };

      if (_playerScore === 5) {
         return {
            string: 'Player got 5 points, player wins!',
            playerW: playerSelection,
            computerW: computerSelection,
         };
      }
      if (_computerScore === 5) {
         return {
            string: 'Computer got 5 points, computer wins!',
            playerW: playerSelection,
            computerW: computerSelection,
         };
      }

      if (roundResult) {
         _playerScore++;
         result.string = `You win! ${playerSelection} beats ${computerSelection}`;
         return result;
      } else if (roundResult === null) {
         result.string =  `${playerSelection} againts ${computerSelection}... Draw!`;
         return result;
      } else if (roundResult === false) {
         _computerScore++;
         result.string = `You lose! ${computerSelection} beats ${playerSelection}`;
         return result;
      } else {
         result.string = 'rock, paper, and scissors are the only options you can pick!';
         result.state = undefined;
         return result;
      }
   };

   return { getScores, play };
})();