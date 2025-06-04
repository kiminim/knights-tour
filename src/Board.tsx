import { useEffect, useState } from 'react';
import { Square } from './Square';

type BoardProps = {
	boardSize: number;
	showNumbers: boolean;
	resetCounter: number;
};

// [O,X,O,X,O]
// [X,O,O,O,X]
// [O,O,1,O,O]
// [X,O,O,O,X]
// [O,X,O,X,O]

// Possible moves
// row - 1, col - 2
// row - 2, col - 1

// row - 1, col + 2
// row - 2, col + 1

// row + 1, col - 2
// row + 2, col - 1

// row + 1, col + 2
// row + 2, col + 1

// 0 means not visited
// Value in array is order it was clicked on

export function Board({ boardSize, showNumbers, resetCounter }: BoardProps) {
	const [board, setBoard] = useState<number[][]>(
		Array.from({ length: boardSize }, () => Array(boardSize).fill(0)),
	);

	// Reset board if size changes/reset counter is updated
	useEffect(() => {
		setBoard(Array.from({ length: boardSize }, () => Array(boardSize).fill(0)));
	}, [boardSize, resetCounter]);

	// Check if clicked square is a valid move
	// TODO: allow unclick of square if its the last visited
	const handleSquareClick = (rowIndex: number, colIndex: number) => {
		setBoard((prevBoard) => {
			// Prevent duplicate clicks
			if (prevBoard[rowIndex][colIndex] !== 0) return prevBoard;

			const newBoard = prevBoard.map((row) => [...row]);

			const visitedCount = prevBoard.flat().filter((val) => val !== 0).length;
			newBoard[rowIndex][colIndex] = visitedCount + 1;
			return newBoard;
		});
	};

	const getValue = (rowIndex: number, colIndex: number) => {
		return board[rowIndex][colIndex];
	};

	return (
		<div
			className="board"
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${boardSize}, 100px)`,
			}}
		>
			{board.map((row, rowIndex) =>
				row.map((_, colIndex) => (
					<Square
						key={`${rowIndex}-${colIndex}`}
						value={getValue(rowIndex, colIndex)}
						showNumber={showNumbers}
						onSquareClick={() => handleSquareClick(rowIndex, colIndex)}
					/>
				)),
			)}
		</div>
	);
}
