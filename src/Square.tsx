type SquareProps = {
	value: number;
	showNumber: boolean;
	onSquareClick?: () => void;
	isHighlighted: boolean;
	isDisabled: boolean;
	size: number;
};

export function Square({
	value,
	showNumber,
	onSquareClick,
	isHighlighted,
	isDisabled,
	size,
}: SquareProps) {
	const getColor = (value: number) => {
		if (value !== 0) return 'light-dark(lightgreen, #14532d)'; // visited
		if (isHighlighted) return 'light-dark(lightblue, #1e40af)'; // next possible move
		return 'light-dark(white, #1a1a1a)'; // default
	};

	return (
		<button
			className="square"
			onClick={onSquareClick}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				backgroundColor: getColor(value),
				cursor: isDisabled ? 'default' : 'pointer',
				border: '1px solid #ccc',
				fontSize: '1rem',
			}}
			disabled={isDisabled}
		>
			{showNumber && value !== 0 ? value : ''}
		</button>
	);
}
