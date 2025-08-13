let currentplayer = "X";
let NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
let turnCounter = 0;

const creatBoarderArray = () => {
  let board = [];

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => "_"));
  }

  return board;
};

let board = creatBoarderArray();

const resetButton = document.querySelector("#reset");

const getCellPlacement = (index, numberOfRows) => {
  const row = Math.floor(index / numberOfRows);
  const col = index % numberOfRows;

  return [row, col];
};

const checkRow = (currentplayer) => {
  let column = 0;

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    while (column < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentplayer) {
        column = 0;
        break;
      }
      column++;
    }

    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
};

const chekColumns = () => {
  let row = 0;

  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    while (row < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentplayer) {
        row = 0;
        break;
      }
      row++;
    }

    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
};

const checkDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] !== currentplayer) {
      count = 0;
      break;
    }
    count++;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};

const checkReverseDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][NUMBER_OF_ROWS - 1 - count] !== currentplayer) {
      count = 0;
      break;
    }
    count++;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};

const checkWin = (currentplayer) => {
  if (checkRow(currentplayer)) {
    return true;
  }

  if (chekColumns(currentplayer)) {
    return true;
  }

  if (checkDiagonals(currentplayer)) {
    return true;
  }

  if (checkReverseDiagonals(currentplayer)) {
    return true;
  }
};

const resetBoard = () => {
  document.querySelector(".board").remove();
  creatBoard();
  board = creatBoarderArray();
  currentplayer = "X";
  turnCounter = 0;
};

const runWinEvent = (currentplayer) => {
  setTimeout(() => {
    alert(`Player ${currentplayer} wins!`);
    resetBoard();
  }, 100);
};

const runDrawEvent = () => {
  setTimeout(() => {
    alert("Draw!");
    resetBoard();
  }, 100);
};

const drawMarkInCell = (cell, currentplayer) => {
  cell.querySelector(".value").textContent = currentplayer;
  cell.classList.add(`cell--${currentplayer}`);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);
  if (board[row][col] === "_") {
    turnCounter++;
    board[row][col] = currentplayer;
    drawMarkInCell(cell, currentplayer);

    if (checkWin(currentplayer)) {
      runWinEvent(currentplayer);
    } else {
      turnCounter === turns && runDrawEvent();

      currentplayer = currentplayer === "X" ? "O" : "X";
    }
  }
};

const creatBoard = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");

  board.classList.add("board");

  for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
    const cellElementString = `<div class="cell" role="button" tabindex=${
      i + 1
    }><span class="value"></span></div>`;
    const cellElement = document
      .createRange()
      .createContextualFragment(cellElementString);

    cellElement.querySelector(".cell").onclick = (event) =>
      cellClickHandler(event, i);
    cellElement.querySelector(".cell").onkeydown = (event) =>
      event.key === "Enter" ? cellClickHandler(event, i) : true;
    board.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
  }

  container.insertAdjacentElement("afterbegin", board);
};

resetButton.onclick = resetBoard;

creatBoard();
