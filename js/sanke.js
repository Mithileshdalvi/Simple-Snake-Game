//Constants and Variables

let inputDirection = {x: 0 , y: 0};
const foodsound = new Audio("../music/food.mp3");
const gameOversound = new Audio("../music/gameover.mp3");
const movesound = new Audio("../music/move.mp3");
const musicsound = new Audio("../music/music.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13 , y: 15}
]
let food = {x: 6 , y: 7};

//Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if snake bites itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //if snake coliides with the wall 

    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine(){
    //Part1: Updateing the snake array n food

    if(isCollide(snakeArr)){
        gameOversound.play();
        musicsound.pause();
        inputDirection = {x: 0 , y: 0};
        alert("Game Over. Press any key to play again.");
        snakeArr = [{x: 13 , y: 15}];
        musicsound.play();
        score = 0;
    }

    //If u have eaten the food,update score and reposition the food

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});
        let a= 2;
        let b= 16;
        food = {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())}
    }

    //Moving the snake

    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    //Part2: Display the  snake

    board.innerHTML = "";
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Part3: Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main Logic starts here 
musicsound.play();
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highscore: " + hiscoreval;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    inputDirection = {x: 0, y: 1} //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0; 
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0; 
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1; 
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1; 
            inputDirection.y = 0;
            break;

        default:
            break;
    }
});
