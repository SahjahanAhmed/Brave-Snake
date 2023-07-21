let pause = false;
const selectSpeed = document.getElementById('select-speed')
const buttonPause = document.getElementById('pauseBtn')
const buttonPlay = document.getElementById('playBtn')
const inputButtons = document.querySelectorAll('.key')
const scoreEl = document.getElementById('scoreEl')
const board = document.getElementById('board')
let inputDir = { x: 0, y: 0 }
let snakeArr = [{ x: 13, y: 15 }]
food = { x: 6, y: 7 }

let speed = 6
let lastPaintTime = 0
let score = 0

selectSpeed.addEventListener('change', (e) => {
  switch (e.target.value) {
    case 'slow' :
    speed = 2
    break;
    case 'normal':
    speed = 6
    break;
    case  'medium':
    speed = 6
    break;
    case  'fast':
    speed = 10
    break;
    case 'fastest':
    speed = 18
    break;
  }
})

pauseBtn.addEventListener('click', () => {

  speed = 0
})
playBtn.addEventListener('click', () => {
  if (speed != 0) {
    inputDir = { x: 0, y: -1 }
  }
  speed = 6
})

const main = (ctime) => {
  if (pause) return
  window.requestAnimationFrame(main)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return
  }
  lastPaintTime = ctime

  gameEngine()
}


window.requestAnimationFrame(main)


function isCollide(snake) {
  // If you bump into yourself  
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0) {
    return true;
  }

  return false;
}

const gameEngine = () => {

  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press OK to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }


  scoreEl.innerHTML = `Score: ${score}`

  // if i eaten the food
  if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
    score += 1
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    console.log(snakeArr)

  }


  // display the snake

  board.innerHTML = ''
  snakeArr.forEach((snake, i) => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = snake.y
    snakeElement.style.gridColumnStart = snake.x
    if (i === 0) {
      snakeElement.classList.add('head')
    }
    else {
      snakeElement.classList.add('snake')
    }
    board.appendChild(snakeElement)

  })

  // display the food
  const foodElement = document.createElement('div')
  foodElement.classList.add('food')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  board.appendChild(foodElement)


  // moving the snake
  for (var i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }
  }
  snakeArr[0].x += inputDir.x
  snakeArr[0].y += inputDir.y
}

// change directions
inputButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    switch (e.currentTarget.id) {
      case 'left':
        inputDir = { x: -1, y: 0 }
        break;
      case 'right':
        inputDir = { x: 1, y: 0 }
        break;
      case 'up':
        inputDir = { x: 0, y: -1 }
        break;
      case 'down':
        inputDir = { x: 0, y: 1 }
    }
  })
})

window.addEventListener('keyup',(e)=>{
  switch (e.key) {
    case 'ArrowUp':inputDir = { x: 0, y: -1 };
    break
    case 'ArrowDown':inputDir = { x: 0, y: 1 };
    break 
    case 'ArrowLeft':inputDir = { x: -1, y: 0 };
    break
    case 'ArrowRight':inputDir = { x: 1, y: 0 };
  }
})