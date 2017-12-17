class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game Over! Here was the final board:');
      this._board.print();
    } else if (this._board.hasSafeTiles()) {
      console.log('Current Board: ');
      this._board.print();
    } else {
      console.log('Congratulations, you won! Here was your winning board: ');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns, numberOfBombs) ;
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  
  get playerBoard() {
    return this._playerBoard;
  }
  
  hasSafeTiles() {
    return this._numberOfBombs !== this._numberOfTiles;
  }
  
  getNumberOfNeighborBombs (rowIndex, columnIndex) {
  	const neighborOffsets = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [1, 1], [0, 1], [1, -1], [1, 0] ];
  	const numberOfRows = this._bombBoard.length;
  	const numberOfColumns = this._bombBoard[0].length;
  	
  	let numberOfBombs = 0;
  	neighborOffsets.forEach(offset => {
  		const neighborRowIndex = rowIndex + offset[0];
  		const neighborColumnIndex = columnIndex + offset[1];
  		if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
  			if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
  				numberOfBombs++;
  			}
  		}
  	});
  	return numberOfBombs;
  }

  flipTile (rowIndex, columnIndex) {
  	if (this._playerBoard[rowIndex][columnIndex] != ' ') {
  		console.log('This tile has already been flipped!');
  		return;
  	}  
  	if (this._bombBoard[rowIndex][columnIndex] === 'B') {
  		this._playerBoard[rowIndex][columnIndex] = 'B';
  	} else {
  		this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
  	}
  }


  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
  	let board = [];
  	for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
  		let row = [];
  		for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
  			row.push(' ');
  		}
  		board.push(row);
  	}
  	return board;
  }

  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
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
  }

}



const game = new Game (3, 2, 4);
game.playMove(1, 1);


/* const playerBoard = generatePlayerBoard(3, 3);
const bombBoard = generateBombBoard(3, 3, 3);

console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard); */
