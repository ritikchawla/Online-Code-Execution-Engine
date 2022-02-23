import { Dispatch } from "redux";
import bundler from "../../bundler";
import {
	DeleteCellAction,
	InserCellAfterAction,
	MoveCellAction,
	UpdateCellAction,
	Direction,
	Action
} from "../actions/actionInterfaces";
import { ActionType } from "../actionTypes/actionTypes";
import { CellTypes } from "../cellInterface";

export const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: { id, content }
	};
};

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id
	};
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: { id, direction }
	};
};

export const insertCellAfter = (
	id: string | null,
	type: CellTypes
): InserCellAfterAction => {
	return {
		type: ActionType.INSERT_CELL_AFTER,
		payload: { id, type }
	};
};

export const createBundle =
	(cellId: string, codeInput: string) => async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId
			}
		});

		const result = await bundler(codeInput);

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: result
			}
		});
	};
