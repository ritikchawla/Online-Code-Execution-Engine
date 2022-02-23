import React from "react";
import { Cell } from "../state/cellInterface";
import ActionBar from "./ActionBar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

import "../styles/CellListItem.css";

interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	const toShow: JSX.Element =
		cell.type === "code" ? (
			<>
				<div className="action-bar-wrapper">
					<ActionBar cellId={cell.id} />
				</div>
				<CodeCell cell={cell} />
			</>
		) : (
			<>
				<TextEditor cell={cell} />
				<ActionBar cellId={cell.id} />
			</>
		);

	return <div className="cell-list-item">{toShow}</div>;
};

export default CellListItem;
