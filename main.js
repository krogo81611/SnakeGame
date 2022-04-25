//Declare global variables to track game board size

const LINE_PIXEL_COUNT = 40;
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT**2;

//Track scores to display to user
let totalFoodEaten = 0;
let totalDistanceTraveled = 0;

//Shorten reference to game board
const gameContainer = document.getElementById('gameContainer');

//Generate gameboard
const createGameBoardPixels = () => {
    for (let i = 0; i<TOTAL_PIXEL_COUNT; i++) {
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
    }
}

//Shorten references to game pixels
const gameBoardPixels = document.getElementsByClassName('gameBoardPixel');

//Create the randomly generated food items in the game board
let currentFoodPosition = 0;
const createFood = () => {
gameBoardPixels[currentFoodPosition].classList.remove('food')  
currentFoodPosition = Math.round(Math.random()*TOTAL_PIXEL_COUNT)
gameBoardPixels[currentFoodPosition].classList.add('food')
}

//Start setting up snake behavior
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

let snakeCurrentDirection = RIGHT_DIR;

//Validate input and change snake direction
const changeDirection = newDirectionCode => {
    if(newDirectionCode == snakeCurrentDirection) return;

    if(newDirectionCode == LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR) {
        snakeCurrentDirection = newDirectionCode;
    } else if (newDirectionCode == UP_DIR && snakeCurrentDirection !== DOWN_DIR) {
        snakeCurrentDirection = newDirectionCode;
    }  else if (newDirectionCode == RIGHT_DIR && snakeCurrentDirection !== LEFT_DIR) {
        snakeCurrentDirection = newDirectionCode;
    }  else if (newDirectionCode == DOWN_DIR && snakeCurrentDirection !== UP_DIR) {
        snakeCurrentDirection = newDirectionCode;
    } 
}


//Set starting piont for snake on load
let currentHeadPosition = TOTAL_PIXEL_COUNT/2;

//Set starting length
let snakeLength = 200;

//Start moving snake
const moveSnake = () => {
    switch(snakeCurrentDirection) {
        case LEFT_DIR:
            --currentHeadPosition;
            const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0
            if(isHeadAtLeft) {
                currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT;
            }
            break;
        case RIGHT_DIR:
            ++currentHeadPosition
            const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT == 0
            if(isHeadAtRight) {
                currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT;
            }
            break;
        case UP_DIR:
            currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT;
            const isHeadAtTop = currentHeadPosition < 0
            if(isHeadAtTop) {
                currentHeadPosition = currentHeadPosition + TOTAL_PIXEL_COUNT;
            }
            break;
        case DOWN_DIR:
            currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT;
            const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT-1;
            if(isHeadAtBottom) {
                currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT;
            }
            break;
        default:
            break;
    }

    let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition];
    
    if (nextSnakeHeadPixel.classList.contains('snakeBodyPixel')) {
        alert(`You have eaten ${totalFoodEaten} food and traveled ${totalDistanceTraveled} pixels.`)
    }
}