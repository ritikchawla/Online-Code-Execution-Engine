import { Action } from "../actions/actionInterfaces";
import { ActionType } from "../actionTypes/actionTypes";
import { Cell } from "../cellInterface";

import produce from "immer";

interface CellState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}

const initialState: CellState = {
	loading: false,
	error: null,
	order: [],
	data: {}
};

const cellsReducer = produce((state: CellState = initialState, action: Action) => {
	switch (action.type) {
		case ActionType.MOVE_CELL: {
			const { id: cellId, direction } = action.payload;

			const index = state.order.findIndex(id => id === cellId);

			const targetIndex = direction === "up" ? index - 1 : index + 1;

			if (targetIndex < 0 || targetIndex > state.order.length - 1) return state;

			let temp = state.order[index];
			state.order[index] = state.order[targetIndex];
			state.order[targetIndex] = temp;

			return state;
		}

		case ActionType.DELETE_CELL: {
			delete state.data[action.payload];
			state.order = state.order.filter(id => id !== action.payload);
			return state;
		}

		case ActionType.INSERT_CELL_AFTER: {
			const cell: Cell = {
				content: "",
				type: action.payload.type,
				id: randomId()
			};

			state.data[cell.id] = cell;

			const index = state.order.findIndex(id => id === action.payload.id);

			if (index < 0) {
				state.order.unshift(cell.id);
			} else {
				state.order.splice(index + 1, 0, cell.id);
			}

			return state;
		}

		case ActionType.UPDATE_CELL: {
			const { id, content } = action.payload;
			state.data[id].content = content;
			return state;
		}

		default:
			return state;
	}
});

const randomId = (): string => Math.random().toString(36).substr(2, 10);

export default cellsReducer;
