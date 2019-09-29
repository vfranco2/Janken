const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const elRound = document.getElementById('round');
const scoreboard = {
  player: 0,
  computer: 0
};



// Initialize Firebase
// -------------------------------------------

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyB28NG_7l5EWCQXuBkju3WJ108jKSeX2zo",
    authDomain: "janken-9cb14.firebaseapp.com",
    databaseURL: "https://janken-9cb14.firebaseio.com",
    projectId: "janken-9cb14",
    storageBucket: "janken-9cb14.appspot.com",
    messagingSenderId: "1070635907496",
    appId: "1:1070635907496:web:c975ee953c21d7de71c59d"
  };
  
firebase.initializeApp(firebaseConfig);

// Create db reference
const db = firebase.firestore();
var data = {};


//Markov model history collection
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
//For indexing into Firebase
var historyIndex = "";
var historyHuman;
var historyAI;
//start round count at 1
var roundCounter = 1;
var choiceArray = ["rock" , "paper" , "scissors"];

// Play game
function play(e) {
//User GUI gameplay 
  restart.style.display = 'inline-block';
  const userChoice = e.target.id;
  
if (roundCounter === 1){

    //Read current stats from Firebase
    var docRef = db.collection('models').doc('round1');
    var round1Model = {};
    //just get one document
    docRef.get().then(function(doc) {
    if (doc.exists) {
        round1Model = doc.data();
        var humanPred = humanPrediction(round1Model.A);
        computerChoice = winningMove(humanPred);
        historyIndex += convertToLetter(userChoice); //concatinate choices for firebase index
        historyIndex += convertToLetter(computerChoice);
        console.log(historyIndex);

    
        //Display result
        const winner = compare(userChoice, computerChoice);
        showWinner(winner, computerChoice);
        var printRes = ("Last round won? "+historyWin+"<br>Last pick: "+historyChoice+"<br>Your hand: "+userChoice+"<br>Bot's hand: "+computerChoice+"<br>"+"Round winner: "+results);

        //assign historical values for next round
        historyChoice = userChoice;
        historyWin = curWin;
        elStatsDisplay.innerHTML = printRes;
 
        //move to next round
        roundCounter++;
        elRound.innerText = roundCounter;

        //Firebase - write latest user stats 
        var userChoiceIndex = choiceArray.indexOf(userChoice);
        var tempArray = round1Model.A;
        tempArray[userChoiceIndex] = round1Model.A[userChoiceIndex] + 1;
        console.log(tempArray);
      
        // Update firebase record
        docRef.update({
            A: tempArray
        })
        .then(function() {
        console.log("Document successfully updated!");
        })
        .catch(function(error) {
    // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        });

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}).catch(function(error) {
  console.log("Error getting document:", error);
});



}else if (roundCounter === 2){


    //Read current stats from Firebase
    var docRef = db.collection('models').doc('round2');
    var round2Model = {};
    //just get one document
    docRef.get().then(function(doc) {
    if (doc.exists) {
        round2Model = doc.data();
        var humanPred = humanPrediction(round2Model[historyIndex]);
        computerChoice = winningMove(humanPred);
       
    
        //Display result
        const winner = compare(userChoice, computerChoice);
        showWinner(winner, computerChoice);
        var printRes = ("Last round won? "+historyWin+"<br>Last pick: "+historyChoice+"<br>Your hand: "+userChoice+"<br>Bot's hand: "+computerChoice+"<br>"+"Round winner: "+results);

        //assign historical values for next round
        historyChoice = userChoice;
        historyWin = curWin;
        elStatsDisplay.innerHTML = printRes;
 
        //move to next round
        roundCounter++;
        elRound.innerText = roundCounter;

        //Firebase - write latest user stats 
        var userChoiceIndex = choiceArray.indexOf(userChoice);
        var tempArray = round2Model[historyIndex];
        tempArray[userChoiceIndex] = round2Model[historyIndex][userChoiceIndex] + 1;
        console.log(tempArray);
      

        // Update firebase record
        docRef.update({
            [historyIndex]: tempArray
        })
        .then(function() {
        console.log("Document successfully updated!");
        })
        .catch(function(error) {
    // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        });

        //Increment history index
        historyIndex += convertToLetter(userChoice); //concatinate choices for firebase index
        historyIndex += convertToLetter(computerChoice); //concatinate computer choice
        console.log(historyIndex);

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}).catch(function(error) {
  console.log("Error getting document:", error);
});


}
else if (roundCounter === 3){


    //Read current stats from Firebase
    var docRef = db.collection('models').doc('round3');
    var round3Model = {};
    //just get one document
    docRef.get().then(function(doc) {
    if (doc.exists) {
        round3Model = doc.data();
        console.log(historyIndex);
        var humanPred = humanPrediction(round3Model[historyIndex]);
        computerChoice = winningMove(humanPred);
       
    
        //Display result
        const winner = compare(userChoice, computerChoice);
        showWinner(winner, computerChoice);
        var printRes = ("Last round won? "+historyWin+"<br>Last pick: "+historyChoice+"<br>Your hand: "+userChoice+"<br>Bot's hand: "+computerChoice+"<br>"+"Round winner: "+results);

        //assign historical values for next round
        historyChoice = userChoice;
        historyWin = curWin;
        elStatsDisplay.innerHTML = printRes;
 
        //move to next round
        roundCounter = 1;
        elRound.innerText = roundCounter;

        //Firebase - write latest user stats 
        var userChoiceIndex = choiceArray.indexOf(userChoice);
        var tempArray = round3Model[historyIndex];
        tempArray[userChoiceIndex] = round3Model[historyIndex][userChoiceIndex] + 1;
        console.log(tempArray);
      

        // Update firebase record
        docRef.update({
            [historyIndex]: tempArray
        })
        .then(function() {
        console.log("Document successfully updated!");
        })
        .catch(function(error) {
    // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        });

        //Increment history index
        historyIndex = "";
        console.log(historyIndex);

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}).catch(function(error) {
  console.log("Error getting document:", error);
});




}


    const winner = compare(userChoice, computerChoice);

  showWinner(winner, computerChoice);
  var results = compare(userChoice,computerChoice);

  var printRes = ("Last round won? "+historyWin+"<br>Last pick: "+historyChoice+"<br>Your hand: "+userChoice+"<br>Bot's hand: "+computerChoice+"<br>"+"Round winner: "+results);

  //assign historical values for next round
  historyChoice = userChoice;
  historyWin = curWin
  elStatsDisplay.innerHTML = printRes;
 


}

var winningMove = function(prediction){
    if (prediction === "R"){
        return "P"
    }
    else if (prediction === "S"){
        return "R"
    }
    else{
        return "S"
    }

}

var convertToLetter = function(input){
    if (input == 'rock'){
        return "R";
    }
    else if (input == 'paper') {
        return "P";
    }
    else{
        return "S";
    }
}

var humanPrediction = function(array){
    arrayHighest = array[0];
    highestIndex = 0;
    var handArr = ["R" , "P" , "S"];
    //Check first if they are all equal
    if (array[0] === array[1] && array[0] === array[2]){
        return handArr[Math.floor(handArr.length * Math.random())];
    }

    if (array[1] > arrayHighest){
        arrayHighest = array[1];
        highestIndex = 1;
    }
    else if (array[2] > arrayHighest){
        arrayHighest = array[2];
        highestIndex = 2;
    }
    else{
        //leave highestIndex = 0;
    }

    return handArr[highestIndex];

}

var compare = function(choice1,choice2) {
    if (choice1 === choice2) {
      curWin = null;
      return "draw";}
    if (choice1 === "R" ) {
        if (choice2 === "S") {
          curWin = true;
          return "player";}
        else {
          curWin = false;
          return "computer";}
    }
    if (choice1 === "P") {
        if (choice2 === "R") {
          curWin = true;
          return "player";}
        else {
          curWin = false;
          return "computer";}
    }
    if (choice1 === "S") {
        if (choice2 === "P") {
          curWin = true;
          return "player";}
        else {
          curWin = false;
          return "computer";}
    }
};

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

