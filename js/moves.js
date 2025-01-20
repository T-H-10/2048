const moveIfEmpty1 = (k, add) => {
    while (parseInt(k) % size != (size - add) && board[k + add].num == 0) {
        joining(k, k + add);
        k += add;
        isChanged = true;
    }
    return k;
}
const moveIfEmpty2 = (k, add) => {
    while (k < size * size - add && board[k + add].num == 0) {
        joining(k, k + add);
        k += add;
        isChanged = true;
    }
    return k;
}
const moveIfEmpty3 = (k, add) => {
    while (parseInt(k) % size != 0 && board[k + add].num == 0) {
        joining(k, k + add);
        k += add;
        isChanged = true;
    }
    return k;
}

const moveIfEmpty4 = (k, add) => {
    while (k >= size && board[k + add].num == 0) {
        joining(k, k + add);
        k += add;
        isChanged = true;
    }
    return k;
}

const moveUp = () => {
    isChanged = false;
    let k, i, add = -1 * size;
    for (let j = 0; j < size; j++) {
        for (i = 1; i < size; i++) {
            k = i * size + j;
            k = moveIfEmpty4(k, add);
            if (k >= size && board[k].num == board[k + add].num) {
                joining(k, k + add);
                k += add;
                isChanged = true;
            }
            moveIfEmpty4(k, add);
        }
    }
}

const moveRight = () => {
    isChanged = false;
    let k, j, add = 1;
    for (let i = 0; i < size; i++) {
        for (j = size - 2; j >= 0; j--) {
            k = i * size + j;
            k = moveIfEmpty1(k, add);
            if (parseInt(k) % size != (size - 1) && board[k].num == board[k + add].num) {
                joining(k, k + add);
                k += add;
                isChanged = true;
            }
            moveIfEmpty1(k, add);
        }
    }
}
const moveLeft = () => {
    isChanged = false;
    let k, j, add = -1;
    for (let i = 0; i < size; i++) {
        for (j = 1; j < size; j++) {
            k = i * size + j;
            k = moveIfEmpty3(k, add);
            if (parseInt(k) % size != 0 && board[k].num == board[k + add].num) {
                joining(k, k + add);
                k += add;
                isChanged = true;
            }
            moveIfEmpty3(k, add);
        }
    }
}
const moveDown = () => {
    isChanged = false;
    let k, i, add = size;
    for (let j = 0; j < size; j++) {
        for (i = size - 2; i >= 0; i--) {
            k = i * size + j;
            k = moveIfEmpty2(k, add);
            if (k < size * size - add && board[k].num == board[k + add].num) {
                joining(k, k + add);
                k += add;
                isChanged = true;
            }
            moveIfEmpty2(k, add);
        }
    }
}

document.querySelector("body").addEventListener("keydown", (e) => {
    if (isAbleToMove == true) {
        switch (e.key) {
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowUp":
                moveUp();
                break;
            default:
                break;
        }
        printBoard();
        if (isChanged == true)
            addNewNumber();
    }
})