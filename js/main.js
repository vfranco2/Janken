const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
};

//Vlad - Informed Bot history collection
// --------------------
// <p> tag used to display historical stats
var elStatsDisplay = document.getElementById("disp");

//store the bot's next move
var nextComputerChoice;
//store your last choice
var historyChoice;
//temporarily store current win/loss condition
var curWin;
//store win/loss for next round
var historyWin;

// Play game
function play(e) {
//User GUI gameplay 
  restart.style.display = 'inline-block';
  const userChoice = e.target.id;
  const curComputerChoice = getComputerChoice();
  const winner = getWinner(userChoice, curComputerChoice);
  showWinner(winner, curComputerChoice);

//Informed Bot logic
    if (historyChoice === "rock" && historyWin === false){
        nextComputerChoice = "rock";
     } else if(historyChoice === "paper" && historyWin === false){
        nextComputerChoice = "paper";
    } else if(historyChoice === "scissors" && historyWin === false){
        nextComputerChoice = "scissors";
     } else if(historyChoice === "rock" && historyWin === true){
        nextComputerChoice = "paper";
     } else if(historyChoice === "paper" && historyWin === true){
        nextComputerChoice = "scissors";
     } else if(historyChoice === "scissors" && historyWin === true){
        nextComputerChoice = "rock";
    } else{
        nextComputerChoice = "rock";
    }

//   var results = compare(userChoice,computerChoice);
  var results = getResults(userChoice,computerChoice);

  var printRes = ("Last round won? "+historyWin+"<br>Last pick: "+historyChoice+"<br>Your hand: "+userChoice+"<br>Bot's hand: "+curComputerChoice+"<br>"+"Result: "+results)

  //assign historical values for next round
  historyChoice = userChoice;
  historyWin = curWin
  elStatsDisplay.innerHTML = printRes;
 

}

// Get computers choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

//Vlad - Informed bot
//compares choice1 (your choice) to choice2 (bot's choice)
// input: a character 'r', 'p', or 's'
        var compare = function(choice1,choice2) {
                if (choice1 === choice2) {
                  curWin = null;
                  return "It's a tie!";}
                if (choice1 === "r" ||choice1 === "rock" ) {
                    if (choice2 === "s" || choice2 === "scissors") {
                      curWin = true;
                      return "You win!";}
                    else {
                      curWin = false;
                      return "You lose!";}
                }
                if (choice1 === "p"|| choice1 === "paper") {
                    if (choice2 === "r") {
                      curWin = true;
                      return "You win!";}
                    else {
                      curWin = false;
                      return "You lose!";}
                }
                if (choice1 === "s" || choice1 === "scissors") {
                    if (choice2 === "r" || choice2 === "rock") {
                      curWin = false;
                      return "You lose!";}
                    else {
                      curWin = true;
                      return "You win!";}
                }
            };

// Get game results
function getResults(p, c) {
    if (p === c) {
      curWin = null;
      return 'draw';
    } else if (p === 'rock') {
      if (c === 'paper') {
        curWin = false;
        return 'computer wins!';
      } else {
        curWin = true;
        return 'you win!';
      }
    } else if (p === 'paper') {
      if (c === 'scissors') {
        curWin = false;
        return 'computer wins!';
      } else {
        curWin = true;
        return 'you win!';
      }
    } else if (p === 'scissors') {
      if (c === 'rock') {
        curWin = false;
        return 'computer wins!';
      } else {
        curWin = true;
        return 'you win!';
      }
    }
  }

// Get game winner
function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Inc player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else if (winner === 'computer') {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  }
  // Show score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

  modal.style.display = 'block';
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
