document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 29 // 28 squares x 28 squares 784 (each square 24px x 24px)

    // layout of grid and what is in squares

    const layout = [
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
1,3,1,1,1,1,0,1,1,0,1,1,0,0,0,0,0,1,1,0,1,1,0,1,1,1,1,0,1,
1,0,1,1,1,1,0,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,1,1,1,1,0,1,
1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,3,0,1,
1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,
1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,
1,1,1,1,0,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,0,1,1,1,1,
1,1,1,1,0,0,0,0,0,4,1,1,1,2,2,2,1,1,1,4,0,0,0,0,0,1,1,1,1,
1,1,1,1,0,1,1,1,1,4,1,2,2,2,2,2,2,2,1,4,1,1,1,1,0,1,1,1,1,
1,1,1,1,0,1,1,1,1,4,1,2,2,2,2,2,2,2,1,4,1,1,1,1,0,1,1,1,1,
0,0,0,0,0,0,0,0,0,4,1,2,2,2,2,2,2,2,1,4,0,0,0,0,0,0,0,0,0,
1,0,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,0,1,
1,0,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,0,1,
1,0,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,1,
1,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,
1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,
1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,
1,1,1,0,0,0,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,0,0,0,0,1,1,1,
1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,
1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,
1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,0,1,
1,0,1,1,1,0,1,0,3,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1,1,1,0,1,
1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,0,1,
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
    
    //pacDotEaten
    //powerup Eaten
    //Gameover check
    //check for win    

    }
    
    document.addEventListener('keyup', movePac)

});