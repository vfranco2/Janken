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

//store the bot's move
var computerChoice;
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
  

//Informed Bot logic
    if (historyChoice === "rock" && historyWin === false){
        computerChoice = "rock";
     } else if(historyChoice === "paper" && historyWin === false){
        computerChoice = "paper";
    } else if(historyChoice === "scissors" && historyWin === false){
        computerChoice = "scissors";
     } else if(historyChoice === "rock" && historyWin === true){
        computerChoice = "paper";
     } else if(historyChoice === "paper" && historyWin === true){
        computerChoice = "scissors";
     } else if(historyChoice === "scissors" && historyWin === true){
        computerChoice = "rock";
    } else{
        computerChoice = "rock";
    }

    var compare = function(choice1,choice2) {
        if (choice1 === choice2) {
          curWin = null;
          return "draw";}
        if (choice1 === "rock" ) {
            if (choice2 === "scissors") {
              curWin = true;
              return "player";}
            else {
              curWin = false;
              return "computer";}
        }
        if (choice1 === "paper") {
            if (choice2 === "rock") {
              curWin = true;
              return "player";}
            else {
              curWin = false;
              return "computer";}
        }
        if (choice1 === "scissors") {
            if (choice2 === "paper") {
              curWin = true;
              return "player";}
            else {
              curWin = false;
              return "computer";}
        }
    };
    const winner = compare(userChoice, computerChoice);

  showWinner(winner, computerChoice);
  var results = compare(userChoice,computerChoice);

  var printRes = ("Last round won: "+historyWin+"<br>Last pick: "+historyChoice+"<br>Your hand: "+userChoice+"<br>Bot's hand: "+computerChoice+"<br>"+"Result: "+results);

  //assign historical values for next round
  historyChoice = userChoice;
  historyWin = curWin
  elStatsDisplay.innerHTML = printRes;
 

}

function showWinner(compare, computerChoice) {
  if (compare === 'player') {
    // Inc player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice}</strong></p>
    `;
  } else if (compare === 'computer') {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice}</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice}</strong></p>
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
