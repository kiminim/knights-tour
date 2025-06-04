import { useState } from 'react';
import './App.css';
import { Board } from './Board';

const DEFAULT_SIZE = 5;

export function App() {
	const [boardSize, setBoardSize] = useState(DEFAULT_SIZE);
	const [showNumbers, setShowNumbers] = useState(true);
	const [resetCounter, setResetCounter] = useState(0);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.valueAsNumber) {
			setBoardSize(e.target.valueAsNumber);
		}
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
				defaultValue={DEFAULT_SIZE}
				onChange={(e) => handleInput(e)}
			/>
			<button id="show-numbers" onClick={handleClick}>
				Show numbers
			</button>
			<button id="reset-board" onClick={handleReset}>
				Reset board
			</button>
			<Board boardSize={boardSize} showNumbers={showNumbers} resetCounter={resetCounter} />
		</>
	);
}
