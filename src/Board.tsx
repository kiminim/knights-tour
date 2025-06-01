import { Square } from './Square';

type BoardProps = {
	boardSize: number;
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

export function Board({ boardSize }: BoardProps) {
	const squares = Array(boardSize)
		.fill(0)
		.map(() => Array(boardSize).fill(0));

	const getValue = (rowIndex: number, colIndex: number) => {
		return rowIndex * boardSize + colIndex + 1;
	};

	return (
		<div className="board" style={{ gridTemplateColumns: `repeat(${boardSize}, 100px)` }}>
			{squares.map((row, rowIndex) =>
				row.map((col, colIndex) => (
					<Square key={`${rowIndex}-${colIndex}`} value={getValue(rowIndex, colIndex)} />
				)),
			)}
		</div>
	);
}
