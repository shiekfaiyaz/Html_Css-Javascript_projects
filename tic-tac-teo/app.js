

//This is logic 2

let PlayerX = "X";


let maingame = document.querySelector('#maingame');
let opstions = ["", "", "", "", "", "", "", "", ""];
const element1 = document.querySelector(".palybox1");
const element2 = document.querySelector(".palybox2");
let info = document.querySelector("#infor");
let restart = document.getElementById("Reset");
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const Cells = document.querySelectorAll(".cell");
let gamestart = true;


start();

function start() {

    gamestart = true;

    Cells.forEach(Allcells => {
        Allcells.addEventListener("click", handlers, { once: true });

    });

    restart.addEventListener("click", Restartbtn);
}

function handlers(e) {

    const Allcells = e.target;

    const currentplayer = gamestart ? 'X' : 'O';
    myturn(Allcells, currentplayer);

    playerturn();

    checkwin();
    disablebtn();

}

function playerturn() {

    gamestart = !gamestart;

    if (gamestart) {

        element1.classList.add("activie");
        element2.classList.remove("activie");
    } else {

        element2.classList.add("activie");
        element1.classList.remove("activie");
    }

}


function myturn(Allcells, currentplayer) {

    Allcells.innerHTML = currentplayer;
    Allcells.classList.add(currentplayer);
    info.textContent = ` ${currentplayer}'s Turn!`;

}

function disablebtn() {

    let clicked = false;

    Cells.forEach(Allcells => {
        Allcells.addEventListener("click", function () {

            if (!clicked) {
                currentplayer = "X";
                clicked = true;
            } else {
                currentplayer = "O";
            }
        });

    });

}


function checkwin() {

    let gamewin = false;
    for (let i = 0; i < winCombinations.length; i++) {
        let condition = winCombinations[i];
        let a = Cells[condition[0]].innerText;
        let b = Cells[condition[1]].innerText;
        let c = Cells[condition[2]].innerText;
        if (a != "" && b != "" && c != "") {

            if (a === b && b === c && c === a) {

                info.textContent = ` ${a}'s wins!`;
                gamewin = true;
                break;
            } 

        }
    }


}



// function draw() {
//    for (let i = 0; i < winCombinations.length; i++) {
//       for (let j = 0; j < winCombinations[i].length; j++) {
//         console.log(winCombinations[i][j]);
//       } 
//       if(!maingame == "" && !gamestart){

//         console.log("draw");

//       }

//     }

//   }



function Draw() {

    Cells.forEach(Allcells => {
        Allcells.addEventListener("click", handlers, { once: true });

    });

     if(!gamewin){
        console.log("draw")
     }


}



//line Animastion 
function lineAni() {


}





function Restartbtn() {
    console.log("restart");
    currentplayer = "X";
    restart.addEventListener('click', () => {
        let cells = document.querySelectorAll('.cell');
        cells.forEach(e => {
            e.innerText = "";
        }); gamestart = false;
        info.textContent = ` ${currentplayer}'s Turn!`;

    });

}




