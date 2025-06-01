type SquareProps = {
	isCurrent?: boolean;
	hasBeenVisited?: boolean;
	value?: number;
};

export function Square({ value = 0 }: SquareProps) {
	return <button className="square">{value}</button>;
}
