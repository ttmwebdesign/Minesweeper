const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
	let board = [];
	for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		let row = [];
		for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
			row.push(' ');
		}
		board.push(row);
	}
	return board;
};

// console.log('Player board:');
// console.log(generatePlayerBoard(3, 4));


const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
	let board = [];
	for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		let row = [];
		for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
			row.push(null);
		}
		board.push(row);
	}
	let numberOfBombsPlaced = 0;
	while (numberOfBombsPlaced < numberOfBombs) {
		const randomRowIndex = Math.floor(Math.random() * numberOfRows);
		const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
		if (board[randomRowIndex][randomColumnIndex] !== ' B ') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced++;
		}
	}
	return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
	const neighborOffsets = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [1, 1], [0, 1], [1, -1], [1, 0] ];
	const numberOfRows = bombBoard;
	const numberOfColumns = bombBoard[0].length;
	let numberOfBombs = 0;
	neighborOffsets.forEach(offset => {
		const neighborRowIndex = rowIndex + offset[0];
		const neighborColumnIndex = columnIndex + offset[1];
		if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
			if (bombBoard[neighborRowIndex][0, 0] === 'B') {
				numberOfBombs++;
			}
		}
	});
	return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
	if (playerBoard[rowIndex][columnIndex] != ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
};

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(3, 3);
const bombBoard = generateBombBoard(3, 3, 3);

console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);