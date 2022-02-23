import React from "react";
import { useActions } from "../hooks/useActions";

import "../styles/ActionBar.css";

interface ActionBarProps {
	cellId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
	const { moveCell, deleteCell } = useActions();

	return (
		<div className="action-bar">
			<button
				className="button is-primary is-small action-bar-btn"
				onClick={() => moveCell(cellId, "up")}
			>
				<span className="icon">
					{" "}
					<i className="fas fa-arrow-up"></i>{" "}
				</span>
			</button>
			<button
				className="button is-primary is-small action-bar-btn"
				onClick={() => moveCell(cellId, "down")}
			>
				<span className="icon">
					{" "}
					<i className="fas fa-arrow-down"></i>{" "}
				</span>
			</button>
			<button
				className="button is-primary is-small action-bar-btn"
				onClick={() => deleteCell(cellId)}
			>
				<span className="icon">
					{" "}
					<i className="fas fa-times"></i>{" "}
				</span>
			</button>
		</div>
	);
};

export default ActionBar;
