document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28 // 28 squares x 28 squares 784 (each square 24px x 24px)

    // layout of grid and what is in squares

    const layout = [
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
1,3,1,1,1,0,1,1,0,1,1,0,0,0,0,1,1,1,0,1,1,0,1,1,1,1,0,1,
1,0,1,1,1,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,1,1,1,1,0,1,
1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,
1,0,0,0,0,0,0,0,0,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,3,0,1,
1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,
1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,
1,1,1,0,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,0,1,1,1,1,
1,1,1,0,0,0,0,0,4,1,1,1,2,2,1,1,1,1,4,0,0,0,0,0,1,1,1,1,
1,1,1,0,1,1,1,1,4,1,2,2,2,2,2,2,2,1,4,1,1,1,1,0,1,1,1,1,
1,1,1,0,1,1,1,1,4,1,2,2,2,2,2,2,2,1,4,1,1,1,1,0,1,1,1,1,
1,0,0,0,0,0,0,0,4,1,2,2,2,2,2,2,2,1,4,0,0,0,0,0,0,0,0,1,
1,0,1,1,1,1,0,1,4,1,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,0,1,
1,0,1,1,1,1,0,1,4,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,0,1,
1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,1,
1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,
1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,
1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,
1,1,1,0,0,0,0,0,1,1,0,1,1,1,1,1,0,1,1,1,0,0,0,0,0,1,1,1,
1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,
1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,
1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,0,1,
1,0,1,1,1,0,1,0,3,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1,1,1,0,1,
1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
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

    }

}

createBoard();


let pacCurrentIndex = 492
squares[pacCurrentIndex].classList.add('pac');

function movePac(e){
    squares[pacCurrentIndex].classList.remove('pac')
        
    switch(e.keyCode){
        case 37:
            if(pacCurrentIndex % width !==0 && !squares[pacCurrentIndex -1].classList.contains('wall')) pacCurrentIndex -=1
                break
        case 38:
            if(pacCurrentIndex - width >= 0 && !squares[pacCurrentIndex - width].classList.contains('wall')) pacCurrentIndex -=width
                break
        case 39:
            if(pacCurrentIndex % width < width -1 && !squares[pacCurrentIndex +1].classList.contains('wall')) pacCurrentIndex +=1
                break
        case 40:
            if(pacCurrentIndex + width < width * width && !squares[pacCurrentIndex +width].classList.contains('wall')) pacCurrentIndex +=width
                break            
        }
    squares[pacCurrentIndex].classList.add('pac')
    
    //pacDotEaten
    //powerup Eaten
    //Gameover check
    //check for win    

    }
    
    document.addEventListener('keyup', movePac)

});