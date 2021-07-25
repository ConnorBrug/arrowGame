//word data set is from code.org
//keyboard image is from code.org
//variables
//student A did on events/variables
//student B did the functions
var greetings = ["Hello, ","Nice to see you ","Good Luck ","Hola, "];
var wordList = getColumn("Words", "Word");
var enemies = [];
var x = getXPosition("enemy1");
var y = -225;
var wordLength = 3;
var lives = 3;
var level = 0;
var userName = "";
//the filter function is called and a random list of words is generated
filter(wordList, enemies, wordLength);
//update screen is called to update the word on screen
updateScreen();
//when the start button is clicked the screen is changed and a random greeting is shown
onEvent("startButton", "click", function() {
  setScreen("screen1");
  userName = getText("firstInitial") + getText("secondInitial") + getText("thirdInitial");
  greet(userName);
//the function to move the word is delayed to compensate for any transition time
  setTimeout(function() {
    moveWord();
  }, 1000);
});
//when the restart button is clicked the variables are reset, the screen is changed, and a random list of words is generated
onEvent("restartButton", "click", function( ) {
enemies = [];
level = 0;
y = -225;
wordLength = 3;
lives = 3;
setScreen("screen1");
filter(wordList, enemies, wordLength);
updateScreen();
setTimeout(function() {
  moveWord();
}, 1000);
});
//when any key is lifted the program automatically checks if the word entered is correct
onEvent("screen1", "keyup", function() {
  check(getText("textInput"), enemies);
});
//the function to move the word down screen uses a timed loop
//if the list has less than one word remaining then the length is increases and a new list is generated
function moveWord() {
  timedLoop(20, function() {
  y = getYPosition("enemy1");
  if (enemies.length < 1) {
    wordLength = wordLength+1;
    level++;
    filter(wordList, enemies, wordLength);
    updateScreen();
  }
//conditional for if the word is missed
//the position is reset and the word is removed as well as a life
//a conditional to check the list length is then placed again as well as a conditional to check if the lives have run out
  if (y > 160) {
      lives--;
      y = -225;
      setPosition("enemy1", x, y);
      removeItem(enemies, 0);
      if (enemies.length < 1) {
        wordLength = wordLength+1;
        level++;
        filter(wordList, enemies, wordLength);
        updateScreen();
      }
      updateScreen();
    }
//when the lives are 0 the loop to move the word is stopped and the screen is changed to the lose screen
  if (lives == 0) {
    stopTimedLoop();
    setScreen("youLose");
  }
//this set position moves the word
  setPosition("enemy1", x, y+2);
  });
}
//this function filters a list and takes 5 random words with the desired length and puts them into a desired new list
//it then returns this list
function filter(list, finalList, length) {
var filteredList = [];
length++;
for (var i = 0; i < list.length; i++) {
    if ((list[i]).length < length && (list[i]).length > length-2) {
      appendItem(filteredList, list[i]);
    }
  }
for (var j = 0; j < 5; j++) {
        var number = randomNumber(0,filteredList.length-1);
        var found = false;
        for (var k = 0; k < 5; k++) {
          if (list[k] == filteredList[number]) {
            found = true;
            j--;
          }
        }
        if (found == false) {
          appendItem(finalList, filteredList[number]);
        }
}
return finalList;
}
//this function checks the input with the enemy (in this case the filtered word list enemies)
//if the length is under 1 it refilters and increases the length and level #
function check(input, enemy) {
if (enemy.length < 1) {
  wordLength = wordLength+1;
  level++;
  filter(wordList, enemy, wordLength);
  updateScreen();
}
if (input == enemy[0]) {
    y = -225;
    removeItem(enemy, 0);
    updateScreen();
    setText("textInput", "");
  }
}
//this function assigns a random greeting to the name inputted on the start screen and sets a text label as this
function greet(name) {
  setText("nameOutput", greetings[randomNumber(0,3)]+  name);
}
//this function updates the screen
//all positions and texts are updated to their corresponding variables and lists
function updateScreen() {
  setPosition("enemy1", x, y);
  setText("level", "Level " + level);
  setProperty("enemy1", "text", "\n\n\n\n\n" + enemies[0]);
  setText("wordLengthLabel", "Words Left: " + enemies.length);
  setProperty("lives", "text", "Lives: " + lives);
}
