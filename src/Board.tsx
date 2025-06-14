import { useEffect, useState } from 'react';
import { Square } from './Square';

type BoardProps = {
	boardSize: number;
	showNumbers: boolean;
	resetCounter: number;
};

const knightMoves = [
	[-1, -2],
	[-2, -1],
	[-1, 2],
	[-2, 1],
	[1, -2],
	[2, -1],
	[1, 2],
	[2, 1],
];
const BOARD_PIXEL_SIZE = 500; // total size of the board in px

const visitedCount = (board: number[][]): number => {
	return board.flat().filter((val) => val > 0).length;
};

const isWin = (board: number[][]): boolean => {
	return visitedCount(board) === board.length * board.length;
};

export function Board({ boardSize, showNumbers, resetCounter }: BoardProps) {
	const cellSize = BOARD_PIXEL_SIZE / boardSize;
	const [board, setBoard] = useState<number[][]>(
		Array.from({ length: boardSize }, () => Array(boardSize).fill(0)),
	);
	const [highlightedSquares, setHighlightedSquares] = useState<[number, number][]>([]);
	const [gameOver, setGameOver] = useState<boolean>(false);

	// Reset board if size changes/reset counter is updated
	useEffect(() => {
		setBoard(Array.from({ length: boardSize }, () => Array(boardSize).fill(0)));
		setHighlightedSquares([]);
	}, [boardSize, resetCounter]);

	const handleSquareClick = (rowIndex: number, colIndex: number) => {
		setBoard((prevBoard) => {
			// Prevent duplicate clicks
			if (prevBoard[rowIndex][colIndex] > 0) return prevBoard;

			const newBoard = prevBoard.map((row) => [...row]);

			newBoard[rowIndex][colIndex] = visitedCount(prevBoard) + 1;

			const newHighlights: [number, number][] = knightMoves
				.map(([dx, dy]) => [rowIndex + dx, colIndex + dy] as [number, number])
				.filter(
					([r, c]) => r >= 0 && c >= 0 && r < boardSize && c < boardSize && board[r][c] === 0,
				);

			setHighlightedSquares(newHighlights);
			if (newHighlights.length === 0) {
				setTimeout(() => {
					setGameOver(true);
				}, 100); // slight delay so the final move renders
			}
			return newBoard;
		});
	};

	const getValue = (rowIndex: number, colIndex: number) => {
		return board[rowIndex][colIndex];
	};

	const getIsDisabled = (rowIndex: number, colIndex: number) => {
		return (
			getValue(rowIndex, colIndex) !== 0 || // already visited
			(highlightedSquares.length > 0 &&
				!highlightedSquares.some(([r, c]) => r === rowIndex && c === colIndex))
		);
	};

	return (
		<div
			className="board"
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
				gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
				width: `${BOARD_PIXEL_SIZE}px`,
				height: `${BOARD_PIXEL_SIZE}px`,
			}}
		>
			{board.map((row, rowIndex) =>
				row.map((_, colIndex) => (
					<Square
						key={`${rowIndex}-${colIndex}`}
						value={getValue(rowIndex, colIndex)}
						showNumber={showNumbers}
						onSquareClick={() => handleSquareClick(rowIndex, colIndex)}
						isHighlighted={highlightedSquares.some(([r, c]) => r === rowIndex && c === colIndex)}
						isDisabled={getIsDisabled(rowIndex, colIndex)}
						size={cellSize}
					/>
				)),
			)}
			{gameOver && (
				<div className="game-over">
					<h2>Game Over</h2>
					<p>
						{isWin(board)
							? 'You win!'
							: `No more valid moves! You made ${visitedCount(board)} moves.`}
					</p>
					<button onClick={() => window.location.reload()}>Restart</button>
				</div>
			)}
		</div>
	);
}
