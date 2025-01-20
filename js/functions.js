size = parseInt(new URLSearchParams(location.search).get("size"));
switch(size){
    case 4: fontsize=50;
        break;
    case 5:  fontsize=40;
        break;
    case 6:  fontsize=30;
        break;
}
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const createBoard = () => {
    document.querySelector("#title").innerText+=` ${size}X${size}`;

    let b = document.querySelector("#play");

    for (let index = 0; index < size; index++) {

        let rowBoard = document.createElement('div');
        rowBoard.classList.add("row");
        b.append(rowBoard);
        for (let index = 0; index < size; index++) {
            let column = document.createElement('div');
            column.classList.add("col");
            rowBoard.append(column);
        }
    }
}
/*add the 2 first numbers in the game */
const fillFirstNum = () => {
    let index;
    index = getRandomValue(0, size * size - 1);
    board[index] = { ...numbers[getRandomValue(1, 2)] };
}
/*fill the matrix with 0 */
const fillMat = ({ num, color }) => {
    for (let index = 0; index < size * size; index++) {
        board.push({ num, color });
    }
    fillFirstNum();
    fillFirstNum();
}
const reset = () => {
    let help = [];
    for (let index = 0; index < size * size; index++) {
        help.push(false);
    }
    helpMat = help;
}

const printBoard = () => {
    let col = Array.from(document.querySelectorAll(".col"));
    board.forEach((value, i) => {
        let ob = board[i];
        col[i].style.backgroundColor = ob.color;
        col[i].style.fontSize=`${fontsize}rem`;
        if (ob.num != 0)
            col[i].innerText = ob.num;
        else
            col[i].innerText = "";
    })

};
/*fill the matrix at beginning */
const newGame = () => {
    createBoard();
    fillMat(numbers[0]);
    printBoard();
}
/*return an array of empty places*/
const emptyPlaces = () => {
    let empty = board.map((val, i) => {
        if (val.num > max) {
            max = val.num;
        }
        if (val.num == 0) {
            return i;
        }
    })
    empty = empty.filter((val) => {
        if (val != undefined) {

            return true;
        }
    })
    reset();
    return empty;
}

const isWin = () => max == 2048 && !isWon;

const isEnd = () => {
    for (let i = 0; i < board.length; i++) {
        if (parseInt(i) % size != (size - 1)) {
            if (board[i].num == board[i + 1].num) {
                return false;
            }
        }
        if (i < board.length - size) {
            if (board[i].num == board[i + size].num)
                return false;
        }
    }
    return true;//לממש!!!
}

const addNewNumber = () => {
    printBoard();
    let empty = emptyPlaces();
    if (isWin()) {
        document.querySelector("audio").play();
        clearInterval(myTimer);  /******************************* */
        printBoard();
        fillJson();
        isWon = true;
        document.querySelector("#win").style.display = "flex";
        isAbleToMove=false;
        //return true;
    }
    if (isEndGame == false) {
        let rand, x = ((empty.length <= 2||size==4) ? 1 : 2);
        for (let index = 0; index < x; index++) {
            rand = getRandomValue(0, empty.length - 1);
            board[empty[rand]] = { ...numbers[getRandomValue(1, 2)] };
            empty.splice(rand, 1);
        }
        printBoard();
    }
    if (empty.length == 0) {
        if (isEnd()) {
            clearInterval(myTimer);
            document.querySelector("#over").style.display = "flex";
            isEndGame = true;
            isAbleToMove=false
        }
    }
}

const joining = (index1, index2) => {
    if (helpMat[index1] == false && helpMat[index2] == false) {
        if (board[index2].num != 0 && board[index1].num != 0) {
            helpMat[index2] = true;
            sumScore += (board[index2].num) * 2;
            score();
        }
        board[index2] = {
            ...numbers.find((value) => {
                return value.num == board[index1].num + board[index2].num;
            })
        }
        board[index1] = { ...numbers[0] };
    }
    printBoard();
}

newGame();
reset();
const createTimer = () => {
    setInterval(() => {
        time++;
        let seconds = parseInt(time) % 60, minutes = parseInt(time / 60) % 60, hours = parseInt(time / 60 / 60);
        document.querySelector("#timer").innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000)
}
let myTimer = createTimer();
let score = () => {
    document.querySelector("#score").innerText = `score: ${parseInt(sumScore)}`;
}
document.querySelector("#continue").onclick = (e) => {
    e.preventDefault();
    document.querySelector("#win").style.display = "none";
    myTimer = createTimer();
    isAbleToMove=true;
}

