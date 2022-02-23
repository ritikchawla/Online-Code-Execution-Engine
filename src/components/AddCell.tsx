import React from "react";
import { useActions } from "../hooks/useActions";

import "../styles/AddCell.css";

interface AddCellProps {
	previousCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId }) => {
	const { insertCellAfter } = useActions();

	return (
		<div className="add-cell">
			<div className="add-cell-divider"></div>

			<button
				className="button is-primary"
				onClick={() => insertCellAfter(previousCellId, "code")}
			>
				<span className="icon is-small">
					<i className="fas fa-plus"></i>
				</span>
				<span>Code</span>
			</button>
			<button
				className="button is-primary"
				onClick={() => insertCellAfter(previousCellId, "text")}
			>
				<span className="icon is-small">
					<i className="fas fa-plus" />
				</span>
				<span>Text</span>
			</button>
		</div>
	);
};

export default AddCell;
