// SOUNDS SETUP
const myAudio1 = document.createElement("audio");
myAudio1.src = "./sounds/pig1.ogg";

const myAudio2 = document.createElement("audio");
myAudio2.src = "./sounds/pig2.mp3"

const myAudio3 = document.createElement("audio")
myAudio3.src = "./sounds/theme.ogg"

const myAudio4 = document.createElement("audio")
myAudio4.src = "./sounds/over.mp3"

const myAudio5 = document.createElement("audio")
myAudio5.src = "./sounds/winner.mp3"




document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const msgDisplay = document.getElementById('message')
    const livesDisplay = document.getElementById('lives')
    const width = 29 // 29 squares x 28 squares (each square 24px x 24px)
    let score = 0;
    let lives = 5;
    
    // layout of grid and what is in squares

    const layout = [
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
1,3,22,1,1,23,0,22,23,0,20,21,0,0,0,0,0,20,21,0,22,23,0,22,1,1,23,0,1,
1,0,1,1,1,1,0,1,1,0,0,0,0,22,1,23,0,0,0,0,1,1,0,1,1,1,1,0,1,
1,0,20,1,1,21,0,20,1,1,1,23,0,1,1,1,0,22,1,1,1,21,0,20,1,1,21,0,1,
1,0,0,0,0,0,0,0,0,0,20,21,0,20,1,21,0,20,21,0,0,0,0,0,0,0,3,0,1,
1,1,1,23,0,22,1,1,23,0,0,0,0,0,0,0,0,0,0,0,22,1,1,23,0,22,1,1,1,
1,1,1,1,0,1,1,1,1,0,30,1,1,1,1,1,1,1,31,0,1,1,1,1,0,1,1,1,1,
1,1,1,1,0,20,1,1,21,4,4,4,4,4,4,4,4,4,4,4,20,1,1,21,0,1,1,1,1,
1,1,1,1,0,0,0,0,0,4,5,5,5,5,6,5,5,5,5,4,0,0,0,0,0,1,1,1,1,
1,1,1,1,0,22,1,1,23,4,5,2,2,2,2,2,2,2,5,4,22,1,1,23,0,1,1,1,1,
1,1,1,21,0,20,1,1,21,4,5,2,2,2,2,2,2,2,5,4,20,1,1,21,0,20,1,1,1,
4,4,4,4,0,0,0,0,0,4,5,2,2,2,2,2,2,2,5,4,0,0,0,0,0,4,4,4,4,
23,0,22,1,1,23,0,22,23,4,5,6,5,5,5,5,5,6,5,4,22,23,0,22,1,1,23,0,22,
1,0,20,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,21,0,1,
1,0,0,0,20,21,0,1,1,0,30,1,1,1,1,1,1,1,31,0,1,1,0,20,21,0,0,0,1,
1,1,23,0,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,0,22,1,1,
1,1,1,0,22,1,1,1,1,1,23,0,1,1,1,1,1,0,22,1,1,1,1,1,23,0,1,1,1,
1,1,1,0,20,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,21,0,1,1,1,
1,1,1,0,0,0,0,0,20,1,21,0,20,1,1,1,21,0,20,1,21,0,0,0,0,0,1,1,1,
1,1,1,0,22,1,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,1,23,0,1,1,1,
1,1,21,0,20,1,21,0,30,1,1,1,1,23,0,22,1,1,1,1,31,0,20,1,21,0,20,1,1,
1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,22,1,23,0,22,1,1,1,31,0,1,1,0,1,1,0,30,1,1,1,23,0,22,1,23,0,1,
1,0,1,1,1,0,1,0,3,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1,1,1,0,1,
1,0,20,1,21,0,32,0,30,1,1,1,1,21,0,20,1,1,1,1,31,0,32,0,20,1,21,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
]

const squares = []

//Legend
//0 dot
//1 wall
//2 lair
//3 powerup
//4 empty
//5 lair wall
//6 lair door

//20 = bottom left corner
//21 = bottom right corner
//22 = top left corner
//23 = top right corner
//30 = left curb
//31 = right curb
//32 = down curb

function createBoard(){
    for(let i=0; i < layout.length; i++){
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
        myAudio3.play()
        myAudio2.play()
        //add layout to the board

        if(layout[i] === 0){
            squares[i].classList.add('dot');
        }
        else if(layout[i] === 1){
            squares[i].classList.add('wall')
        }
        else if(layout[i] === 3){
            squares[i].classList.add('powerup')
        }
        else if(layout[i] === 2){
            squares[i].classList.add('lair')
        }
        else if(layout[i] === 5){
            squares[i].classList.add('lair-wall')
        }
        else if(layout[i] === 6){
            squares[i].classList.add('lair-door')
        }
        else if(layout[i] === 20){
            squares[i].classList.add('cornerBL')
        }
        else if(layout[i] === 21){
            squares[i].classList.add('cornerBR')
        }
        else if(layout[i] === 22){
            squares[i].classList.add('cornerTL')
        }
        else if(layout[i] === 23){
            squares[i].classList.add('cornerTR')
        }
        else if(layout[i] === 30){
            squares[i].classList.add('curbL')
        }
        else if(layout[i] === 31){
            squares[i].classList.add('curbR')
        }
        else if(layout[i] === 32){
            squares[i].classList.add('curbDn')
        }
    }

}

createBoard();


let pacCurrentIndex = 496
squares[pacCurrentIndex].classList.add('pac');

function movePac(e){
    squares[pacCurrentIndex].classList.remove('pac')
        
    switch(e.keyCode){
        case 37:
            if(pacCurrentIndex % width !==0 
                && !squares[pacCurrentIndex -1].classList.contains('wall') 
                && !squares[pacCurrentIndex -1].classList.contains('lair')
                && !squares[pacCurrentIndex -1].classList.contains('cornerBL')
                && !squares[pacCurrentIndex -1].classList.contains('cornerBR')
                && !squares[pacCurrentIndex -1].classList.contains('cornerTL')
                && !squares[pacCurrentIndex -1].classList.contains('cornerTR')
                && !squares[pacCurrentIndex -1].classList.contains('lair-wall')
                && !squares[pacCurrentIndex -1].classList.contains('curbDn')
                && !squares[pacCurrentIndex -1].classList.contains('curbL')
                && !squares[pacCurrentIndex -1].classList.contains('curbR')) 
                
                
                
                pacCurrentIndex -=1

                squares[pacCurrentIndex+1].classList.remove('pigman_right')
                squares[pacCurrentIndex+1].classList.remove('pigman_left')
                squares[pacCurrentIndex].classList.add('pigman_left')

            //check if pig is in the left exit

            if((pacCurrentIndex -1) === 347) {
                pacCurrentIndex = 376
                squares[348].classList.remove('pigman_left')
            }

                break
        case 38:
            if(pacCurrentIndex - width >= 0 
                && !squares[pacCurrentIndex - width].classList.contains('wall') 
                && !squares[pacCurrentIndex -width].classList.contains('lair')
                && !squares[pacCurrentIndex -width].classList.contains('cornerBL')
                && !squares[pacCurrentIndex -width].classList.contains('cornerBR')
                && !squares[pacCurrentIndex -width].classList.contains('cornerTL')
                && !squares[pacCurrentIndex -width].classList.contains('cornerTR')
                && !squares[pacCurrentIndex -width].classList.contains('lair-wall')
                && !squares[pacCurrentIndex -width].classList.contains('curbDn')
                && !squares[pacCurrentIndex -width].classList.contains('curbL')
                && !squares[pacCurrentIndex -width].classList.contains('curbR')
                ) 
                
                pacCurrentIndex -=width

                squares[pacCurrentIndex+width].classList.remove('pigman_right')
                squares[pacCurrentIndex+width].classList.remove('pigman_left')
                squares[pacCurrentIndex+1].classList.remove('pigman_right')
                break
        case 39:
            if(pacCurrentIndex % width < width -1 
                && !squares[pacCurrentIndex +1].classList.contains('wall') 
                && !squares[pacCurrentIndex +1].classList.contains('lair')
                && !squares[pacCurrentIndex +1].classList.contains('cornerBL')
                && !squares[pacCurrentIndex +1].classList.contains('cornerBR')
                && !squares[pacCurrentIndex +1].classList.contains('cornerTL')
                && !squares[pacCurrentIndex +1].classList.contains('cornerTR')
                && !squares[pacCurrentIndex +1].classList.contains('lair-wall')
                && !squares[pacCurrentIndex +1].classList.contains('curbDn')
                && !squares[pacCurrentIndex +1].classList.contains('curbL')
                && !squares[pacCurrentIndex +1].classList.contains('curbR')) 
                
                
                pacCurrentIndex +=1

                squares[pacCurrentIndex].classList.add('pigman_right')
                squares[pacCurrentIndex-1].classList.remove('pigman_right')
                squares[pacCurrentIndex-1].classList.remove('pigman_left')
                squares[pacCurrentIndex].classList.remove('pac')

            if((pacCurrentIndex -1) === 375) {
                pacCurrentIndex = 348
                squares[376].classList.remove('pigman_right')

            }

                break
        case 40:
            if(pacCurrentIndex + width < width * width 
                && !squares[pacCurrentIndex +width].classList.contains('wall') 
                && !squares[pacCurrentIndex +width].classList.contains('lair')
                && !squares[pacCurrentIndex +width].classList.contains('cornerBL')
                && !squares[pacCurrentIndex +width].classList.contains('cornerBR')
                && !squares[pacCurrentIndex +width].classList.contains('cornerTL')
                && !squares[pacCurrentIndex +width].classList.contains('cornerTR')
                && !squares[pacCurrentIndex +width].classList.contains('lair-wall')
                && !squares[pacCurrentIndex +width].classList.contains('curbDn')
                && !squares[pacCurrentIndex +width].classList.contains('curbL')
                && !squares[pacCurrentIndex +width].classList.contains('curbR')) 
                
                pacCurrentIndex +=width

                squares[pacCurrentIndex-width].classList.remove('pigman_right')
                squares[pacCurrentIndex-width].classList.remove('pigman_left')

                break            
        }
    squares[pacCurrentIndex].classList.add('pac')
    
    dotEaten()
    powerup()
    gameover()
    checkforwin()    

    }
    
    document.addEventListener('keyup', movePac)

    function dotEaten(){
        if(squares[pacCurrentIndex].classList.contains('dot')){
            score++
            checkforwin();
            scoreDisplay.innerHTML = score
            squares[pacCurrentIndex].classList.remove('dot')
            myAudio1.play()
        }
    }

    // what happens when you eat powerup

    function powerup(){
        if(squares[pacCurrentIndex].classList.contains('powerup')){
            score +=10
            checkforwin();
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 9000)
            squares[pacCurrentIndex].classList.remove('powerup')
            myAudio2.play()
        }
    }

    // stop ghosts blinking

    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false)
    }


    // creating ghost template

    class Ghost{
        constructor(className, startIndex, speed){
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerId = NaN
            this.isScared = false
        }
    }

    ghosts = [
        new Ghost('blinky', 302, 200),
        new Ghost('pinky', 303, 200),
        new Ghost('inky', 304, 200),
        new Ghost('clyde', 305, 200)
    ]



// draw ghosts onto grid

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    }) 

    ghosts.forEach(ghost => moveGhost(ghost))

    //move ghost function

    function moveGhost(ghost){
        const directions = [-1,+1,width, -width]
        let direction = directions[Math.floor(Math.random()*directions.length)]

        ghost.timerId = setInterval(function(){

        //check to see if theres a wall or ghost, if not ghost can go there
        
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') 
            && !squares[ghost.currentIndex + direction].classList.contains('cornerTL')
            && !squares[ghost.currentIndex + direction].classList.contains('cornerTR')
            && !squares[ghost.currentIndex + direction].classList.contains('cornerBL')
            && !squares[ghost.currentIndex + direction].classList.contains('cornerBR')
            && !squares[ghost.currentIndex + direction].classList.contains('curbL')
            && !squares[ghost.currentIndex + direction].classList.contains('curbR')
            && !squares[ghost.currentIndex + direction].classList.contains('curbDn')
            && !squares[ghost.currentIndex + direction].classList.contains('lair-wall')
            && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
            // you can go here
            // remove all ghost related classes

        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost') 
        
            // change the currentIndex to the new safe square
        
            ghost.currentIndex += direction
            
            // redraw the ghost in the new safe space

            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

        }else direction = directions[Math.floor(Math.random() * directions.length)]

        // if ghost is currently scared...

        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        // if the ghosts are scared and pigman eats ghost..

        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac')){
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            score +=100
            checkforwin();
        }  
        
        //if ghost are not scared and pigman eats ghost 
        
        if(squares[ghost.currentIndex].classList.contains('pac')
        && squares[pacCurrentIndex].classList.contains('ghost')
        && !squares[pacCurrentIndex].classList.contains('scared-ghost'))
        {
            
            if(lives > 0) {
            
            
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 250)    

            setTimeout(wounded, 1000);
            
            myAudio2.play()
            
            msgDisplay.innerHTML = "spooked"    
            }
            
        
                   
            }else if(lives <= 0){
                gameover()
            }
        
        
        

        }, ghost.speed)
    }

    // check for gameover

    function gameover(){
        if(squares[pacCurrentIndex].classList.contains('ghost') 
        && !squares[pacCurrentIndex].classList.contains('scared-ghost')){
            
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePac)
            //ghost.currentIndex = ghost.startIndex
            
            livesDisplay.innerHTML = 0;
            scoreDisplay.innerHTML = score
            msgDisplay.innerHTML = ' GAME OVER'

            function reset(){
                window.open("main.html");

            }
            window.onclick = setTimeout(reset, 4400);

            myAudio3.pause();
            myAudio4.play();
            }
        
    }

    function checkforwin(){
        if(score >= 100) {
            msgDisplay.innerHTML = "U WIN!"
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePac)
            
            function reset(){
                window.open("main.html");
            }
            
            window.onclick = setTimeout(reset, 5500);
            myAudio3.pause();
            myAudio5.play();
            
        }

    }

    function wounded(){
        lives--;
        livesDisplay.innerHTML = lives;
    }

});