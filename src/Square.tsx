type SquareProps = {
	value: number;
	showNumber: boolean;
	onSquareClick?: () => void;
};

export function Square({ value, showNumber, onSquareClick }: SquareProps) {
	const getColor = (value: number) => {
		if (value === 0) return 'lightgray';
		return 'lightgreen';
	};

	return (
		<button
			className="square"
			onClick={onSquareClick}
			style={{
				backgroundColor: getColor(value),
			}}
		>
			{showNumber && value !== 0 ? value : ''}
		</button>
	);
}
