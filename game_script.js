var bool = false;
var endGame = false;
//  game numbers
var number = 5;
var round = 0;
//arrays
var main = [];
var a = [];
var b = [];
var c = [];

for(var i = 0; i < number; i++) {
  a[i] = 0;
  b[i] = 0;
  c[i] = 0;
}

main[0] = a;
main[1] = b;
main[2] = c;

function logState() {
  console.log("******* round " + round + " " + bool +" ********");
  console.log("pile A = " + a);
  console.log("pile B = " + b);
  console.log("pile C = " + c);
  round++;

  if ((a.length === 0) && (b.length === 0) && (c.length === 0)) {
      if (bool) {
        console.log("You are the Winner!!!");
      } else {
        console.log("Game Over");
      }
  }
  bool = !bool;
}

logState();

function numberToNum(pile) {
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
function NumTonumber(pile) {
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

function userTurn() {
  var userData = prompt("select pile and number (eg. b2)");
  var userNum = userData.substr(1);
  var pile = userData.substr(0, 1);
  pile = pile.toLowerCase();
  pile = numberToNum(pile);
  removeArr(pile,userNum);
}

function pcRemoveArr(pile, num) {

  if(main[pile].length == 0 || main[pile].length < num) {
      pcTurn();
  } else {
      for(var i = 0; i < num; i++) {
          main[pile].pop();
      }
      logState();
  }
}

function pcTurn() {

  if ((main[0].length === 0) && (main[1].length === 0))  {
    var num = main[2].length;
    alert("computer took " + num + " from " +  NumTonumber(2));
    pcRemoveArr(2,num);
  } else if ((main[1].length === 0) && (main[2].length === 0)) {
    alert("computer took " + num + " from " +  NumTonumber(0));
    var num = main[0].length;
    pcRemoveArr(0,num);
  } else if ((main[0].length === 0) && (main[2].length === 0)) {
    var num = main[1].length;
    alert("computer took " + num + " from " +  NumTonumber(1));
    pcRemoveArr(1,num);
  } else {
    var pile = randomNum(0,3);
    var number = randomNum(1,6);
    pcRemoveArr(pile,number);
    alert("computer took " + number + " from " +  NumTonumber(pile));
  }
  loopGame();
}

function randomNum(min, max) {
  var rNum = Math.floor(Math.random() * (max - min) + min);
  return rNum
}


function loopGame() {
  if (endGame) {
    console.log("game over");
  } else {
    if(bool) {
      userTurn();
    } pcTurn();
  }
}

loopGame();
