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
   let _checkWinner = function() {
      if (_playerScore === 5) return 'You have 5 points, you win the game!';
      if (_computerScore === 5) return 'Computer has 5 points, computer wins the game!';
      return null;
   };

   const getScores = function() {
      return {
         player: _playerScore,
         computer: _computerScore,
      };
   };

   const play = function(playerSelection) {
      let result = {
         playerSelection,
         computerSelection: computerWeapon(),
         message: null,
         state: null,
      };
      let winner = _checkWinner();

      if (winner) {
         result.message = winner;
         result.state = 'finish';
         return result;
      }

      let round = playRound(playerSelection, result.computerSelection);

      switch (round) {
         case 'win':
            _playerScore++;
            result.message = `You win! ${playerSelection} beats ${result.computerSelection}`;
            result.state = round;
            break;

         case 'lose':
            _computerScore++;
            result.message = `You lose! ${result.computerSelection} beats ${playerSelection}`;
            result.state = round;
            break;

         case 'draw':
            result.message = `${playerSelection} againts ${result.computerSelection}? Draw!`;
            result.state = round;
            break;
      }

      winner = _checkWinner();

      if (winner) {
         result.message = winner;
         result.state = 'finish';
         return result;
      } else {
         return result;
      }
   };

   return { getScores, play };
})();