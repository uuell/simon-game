// variables
let btn = document.querySelectorAll('.btn');
let title = document.querySelector('.level-title');
let gameOver = document.querySelector('body');

// Simon Game algo
const buttonColors = ['green','red', 'yellow', 'blue']

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

document.addEventListener('keydown', () => {

  if(!started) {
    nextSequence();
    started = true;
  }
})

const checkAnswer = (currentLevel) => {

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log('wrong');
    gameOver.classList.add('game-over');
    title.innerText = "Game Over, Press Any Key to Restart."
    new Audio('sound/wrong.mp3').play();

    setTimeout(() => {
    gameOver.classList.remove('game-over');
    }, 200);

    startOver();
  }
}

const startOver = () => {
    started = false;
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}

function nextSequence() {

  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  playSound(randomChosenColor);
  buttonAnimation(randomChosenColor);

  level++;
  document.querySelector('.level-title').innerText = 'level ' + level;
}

// Selecting all the buttons and adding an event
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function (e) {

    userClickedPattern.push(e.target.id); 
    console.log(userClickedPattern);


    buttonAnimation(e.target.id);
    playSound(e.target.id);

    checkAnswer(userClickedPattern.length - 1);
  })

}

function buttonAnimation(buttonClicked) {

  // console.log(buttonClicked.classList);
  document.querySelector("#" + buttonClicked).classList.add('pressed');

  // setTimeout function lets you remove a class in a certain time
  setTimeout(() => {
    document.querySelector("#" + buttonClicked).classList.remove('pressed');
  }, 100);
}

function playSound(key) {

  // console.log(key.id);
  switch (key) {
    case 'red':
      new Audio('sound/red.mp3').play();
      break;
    case 'green':
      new Audio('sound/green.mp3').play();
      break;
    case 'yellow':
      new Audio('sound/yellow.mp3').play();
      break;
    case 'blue':
      new Audio('sound/blue.mp3').play();
      break;
    default:
      new Audio('sound/wrong.mp3').play();
      break;
  }
}
