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

console.log('Player board:');
console.log(generatePlayerBoard(3, 4));


const gernerateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
	let board = [];
	for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		let row = [];
		for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
			row.push(null);
		}
		board.push(row);
	}
	return board;
	const numberOfBombsPlaced = 0;
	while (numberOfBombsPlaced < numberOfBombs) {
		const randomRowIndex = Math.floor(Math.random() * numberOfRows);
		const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

		board[randomRowIndex][randomColumnIndex] = ' B ';

		numberOfBombsPlaced++;
	}


};
console.log('Bomb board:');
console.log(gernerateBombBoard(3, 3, 2));