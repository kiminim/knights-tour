import { useState } from 'react';
import './App.css';
import { Board } from './Board';

const DEFAULT_SIZE = 5;

export function App() {
	const [boardSize, setBoardSize] = useState(DEFAULT_SIZE);
	const [pendingSize, setPendingSize] = useState(DEFAULT_SIZE);
	const [showNumbers, setShowNumbers] = useState(true);
	const [resetCounter, setResetCounter] = useState(0);

	const handleSizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.valueAsNumber;
		if (!isNaN(value)) setPendingSize(value);
	};

	// Apply the pending size only when user confirms
	const applySizeChange = () => {
		const clamped = Math.max(5, Math.min(10, pendingSize));
		setPendingSize(clamped);
		setBoardSize(clamped);
	};

	const handleClick = () => {
		setShowNumbers((prev) => !prev);
	};

	const handleReset = () => {
		setResetCounter((prev) => prev + 1);
	};

	return (
		<>
			<h1>Knight's Tour</h1>
			<label htmlFor="board-size">Input board size (n x n):</label>
			<input
				type="number"
				id="board-size"
				min={5}
				max={10}
				value={pendingSize}
				onChange={handleSizeInput}
			/>
			<button onClick={applySizeChange}>Set board size</button>
			<button id="show-numbers" onClick={handleClick}>
				{showNumbers ? 'Hide numbers' : 'Show numbers'}
			</button>
			<button id="reset-board" onClick={handleReset}>
				Reset board
			</button>
			<Board boardSize={boardSize} showNumbers={showNumbers} resetCounter={resetCounter} />
		</>
	);
}
