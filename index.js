document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 29 // 28 squares x 28 squares 784 (each square 24px x 24px)
    let score = 0;
    // layout of grid and what is in squares

    const layout = [
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
1,3,22,1,1,1,0,22,1,0,1,1,0,0,0,0,0,1,1,0,22,1,0,22,1,1,1,0,1,
1,0,1,1,1,1,0,1,1,0,0,0,0,22,1,1,0,0,0,0,1,1,0,1,1,1,1,0,1,
1,0,20,1,1,21,0,20,1,1,1,1,0,1,1,1,0,22,1,1,1,21,0,20,1,1,21,0,1,
1,0,0,0,0,0,0,0,0,0,20,21,0,20,1,21,0,20,21,0,0,0,0,0,0,0,3,0,1,
1,1,1,1,0,22,1,1,1,0,0,0,0,0,0,0,0,0,0,0,22,1,1,1,0,22,1,1,1,
1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,
1,1,1,1,0,20,1,1,21,4,4,4,4,4,4,4,4,4,4,4,20,1,1,21,0,1,1,1,1,
1,1,1,1,0,0,0,0,0,4,1,1,1,1,2,1,1,1,1,4,0,0,0,0,0,1,1,1,1,
1,1,1,1,0,22,1,1,1,4,1,2,2,2,2,2,2,2,1,4,22,1,1,1,0,1,1,1,1,
1,1,1,21,0,20,1,1,21,4,1,2,2,2,2,2,2,2,1,4,20,1,1,21,0,20,1,1,1,
4,4,4,4,0,0,0,0,0,4,1,2,2,2,2,2,2,2,1,4,0,0,0,0,0,4,4,4,4,
1,0,22,1,1,1,0,22,1,4,1,2,1,1,1,1,1,2,1,4,22,1,0,22,1,1,1,0,22,
1,0,20,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,21,0,1,
1,0,0,0,20,21,0,1,1,0,20,1,1,1,1,1,1,1,21,0,1,1,0,20,21,0,0,0,1,
1,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,0,22,1,1,
1,1,1,0,22,1,1,1,1,1,1,0,1,1,1,1,1,0,22,1,1,1,1,1,1,0,1,1,1,
1,1,1,0,20,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,21,0,1,1,1,
1,1,1,0,0,0,0,0,20,1,21,0,20,1,1,1,21,0,20,1,21,0,0,0,0,0,1,1,1,
1,1,1,0,22,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,1,1,0,1,1,1,
1,1,21,0,20,1,21,0,1,1,1,1,1,1,0,22,1,1,1,1,1,0,20,1,21,0,20,1,1,
1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,22,1,1,0,22,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,22,1,1,0,1,
1,0,1,1,1,0,1,0,3,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1,1,1,0,1,
1,0,20,1,21,0,1,0,1,1,1,1,1,21,0,20,1,1,1,1,1,0,1,0,20,1,21,0,1,
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


function createBoard(){
    for(let i=0; i < layout.length; i++){
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
        
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
        else if(layout[i] === 20){
            squares[i].classList.add('cornerBL')
        }
        else if(layout[i] === 21){
            squares[i].classList.add('cornerBR')
        }
        else if(layout[i] === 22){
            squares[i].classList.add('cornerTL')
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
            if(pacCurrentIndex % width !==0 && !squares[pacCurrentIndex -1].classList.contains('wall') && !squares[pacCurrentIndex -1].classList.contains('lair')) pacCurrentIndex -=1

            //check if pig is in the left exit

            if((pacCurrentIndex -1) === 347) {
                pacCurrentIndex = 376


            }

                break
        case 38:
            if(pacCurrentIndex - width >= 0 && !squares[pacCurrentIndex - width].classList.contains('wall') && !squares[pacCurrentIndex -width].classList.contains('lair')) pacCurrentIndex -=width
                break
        case 39:
            if(pacCurrentIndex % width < width -1 && !squares[pacCurrentIndex +1].classList.contains('wall') && !squares[pacCurrentIndex +1].classList.contains('lair')) pacCurrentIndex +=1

            if((pacCurrentIndex -1) === 375) {
                pacCurrentIndex = 348


            }

                break
        case 40:
            if(pacCurrentIndex + width < width * width && !squares[pacCurrentIndex +width].classList.contains('wall') && !squares[pacCurrentIndex +width].classList.contains('lair')) pacCurrentIndex +=width
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
            scoreDisplay.innerHTML = score
            squares[pacCurrentIndex].classList.remove('dot')
        }
    }

    // what happens when you eat powerup

    function powerup(){
        if(squares[pacCurrentIndex].classList.contains('powerup')){
            score +=10
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 9000)
            squares[pacCurrentIndex].classList.remove('powerup')
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
        new Ghost('blinky', 302, 122),
        new Ghost('pinky', 303, 95),
        new Ghost('inky', 304, 100),
        new Ghost('clyde', 305, 300)
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
        
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
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
            score +=100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }

        gameover()
        }, ghost.speed)
    }

    // check for gameover

    function gameover(){
        if(squares[pacCurrentIndex].classList.contains('ghost') && !squares[pacCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePac)
            scoreDisplay.innerHTML = " " + score + ' GAME OVER newb'
        }
    }

    function checkforwin(){
        if(score === 275) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePac)
            scoreDisplay.innerHTML = "U WIN!"
        }

    }


});