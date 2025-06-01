import { useState } from 'react';
import './App.css';
import { Board } from './Board';

const DEFAULT_SIZE = 5;

export function App() {
	const [boardSize, setBoardSize] = useState(DEFAULT_SIZE);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.valueAsNumber) {
			setBoardSize(e.target.valueAsNumber);
		}
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

			<Board boardSize={boardSize} />
		</>
	);
}
