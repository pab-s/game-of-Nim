var bool = true; //boolean to switch between user and computer
var endGame = false;
//  game numbers
var number = 5;
var round = 1;
//arrays
var main = [];
var a = [];
var b = [];
var c = [];

// this creates array values
for(var i = 0; i < number; i++) {
  a[i] = 0;
  b[i] = 0;
  c[i] = 0;
}
main[0] = a;
main[1] = b;
main[2] = c;

// log arrays and checks for the winner
function logState() {
  var userStr = "User";
  var pcStr = "Computer";
  var turnStr = "";

  if (!bool) {
    turnStr = userStr;
  } else {
      turnStr = pcStr;
  }
  console.log("---> Round " + round + " " + turnStr +" turn <---");
  console.log("pile A = " + a);
  console.log("pile B = " + b);
  console.log("pile C = " + c);
  round++;

  if ((a.length === 0) && (b.length === 0) && (c.length === 0)) {
      if (bool) {
        console.log("You are the Winner!!!");
      } else {
        console.log("You lose");
      }
      endGame = true;
  }
  bool = !bool;
  loopGame();
}

// function to pass letter to number
function letterToNum(pile) {
  switch (pile) {
    case "a":
      pile = 0;
      break;
    case "b":
      pile = 1;
      break;
    case "c":
      pile = 2;
      break;
    default:
      break;
    }
    return pile;
}

// function to pass number to letter
function numToLetter(pile) {
  switch (pile) {
    case 0:
      pile = "A";
      break;
    case 1:
      pile = "B";
      break;
    case 2:
      pile = "C";
      break;
    default:
      break;
    }
    return pile;
}

// user remove array
function removeArr(pile, num) {
  if(main[pile].length == 0 || main[pile].length < num) {
    alert("Try Again!");
    userTurn();
  } else {
    for(var i = 0; i < num; i++) {
        main[pile].pop();
    }
    logState();
  }
}

// user checks prompt and calls remove array
function userTurn() {
  var userData = prompt("select pile and number (e.g. a5, b2, c4)");
  userData = userData.toLowerCase();
  var pile = userData.slice(0, 1);
  var userNum = userData.slice(userData.length - 1, userData.length);

  var reExp1 = /[abc]{1}/;
  var reExp2 = /\d{1}/;
  var test1 = reExp1.test(pile);
  var test2 = reExp2.test(userNum);

  if((test1) && (test2)) {
    pile = letterToNum(pile);
    removeArr(pile,userNum);
  } else {
    alert("Try Again!");
    userTurn();
  }
}

// computer remove array
function pcRemoveArr(pile, num) {
  if(main[pile].length == 0 || main[pile].length < num) {
      pcTurn();
  } else {
      for(var i = 0; i < num; i++) {
          main[pile].pop();
      }
      alert("computer took " + num + " from pile " +  numToLetter(pile));
      logState();
  }
}

// computer turn, trys to make a "smart move" and calls remover array
function pcTurn() {

  if ((main[0].length === 0) && (main[1].length === 0))  {
    var num = main[2].length;
    pcRemoveArr(2,num);
  } else if ((main[1].length === 0) && (main[2].length === 0)) {
    var num = main[0].length;
    pcRemoveArr(0,num);
  } else if ((main[0].length === 0) && (main[2].length === 0)) {
    var num = main[1].length;
    pcRemoveArr(1,num);
  } else {
    var pile = randomNum(0,3);
    var number = randomNum(1,6);
    pcRemoveArr(pile,number);
  }
}

function randomNum(min, max) {
  var rNum = Math.floor(Math.random() * (max - min) + min);
  return rNum
}
// loops the game, toggles between user and computer and checks for the end of the game
function loopGame() {
  if (endGame) {
    console.log("GAME OVER");
    return;
  } else {
    if(bool) {
      userTurn();
    } else {
      pcTurn();

    }
  }
}
logState();
