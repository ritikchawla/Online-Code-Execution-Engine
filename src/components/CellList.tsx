import React, { Fragment } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
	const { order, data } = useTypedSelector(state => state.cells);

	const renderedCells = order.map(cellId => (
		<Fragment key={cellId}>
			<CellListItem cell={data[cellId]} />
			<AddCell previousCellId={cellId} />
		</Fragment>
	));

	return (
		<div>
			<AddCell previousCellId={null} /> {renderedCells}
		</div>
	);
};

export default CellList;
