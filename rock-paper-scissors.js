function playRound(playerSelection = '', computerSelection = '') {
   let options = {
      rock: 'rock',
      scissors: 'scissors',
      paper: 'paper',
   };

   // return error if parameters are not strings
   if (typeof playerSelection !== 'string' || 
       typeof computerSelection !== 'string') throw new Error('playRound expects non-empty strings as arguments');

   playerSelection = playerSelection.trim().toLowerCase();
   computerSelection = computerSelection.trim().toLowerCase();

   if (options[playerSelection] === undefined || 
       options[computerSelection] === undefined) throw new Error('playerSelection or computerSelection are not valid options');

   if (playerSelection === computerSelection) return 'draw';

   switch (playerSelection) {
      case 'rock':
         if (computerSelection === 'scissors') return 'win';
         if (computerSelection === 'paper')    return 'lose';
         break;

      case 'scissors':
         if (computerSelection === 'paper') return 'win';
         if (computerSelection === 'rock')  return 'lose';
         break;

      case 'paper':
         if (computerSelection === 'rock')     return 'win';
         if (computerSelection === 'scissors') return 'lose';
         break;
   }
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