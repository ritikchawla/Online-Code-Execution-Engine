import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { ActionType } from "./actionTypes/actionTypes";
import combinedReducers from "./reducers/combineReducers";

export const store = createStore(combinedReducers, {}, applyMiddleware(thunk));

store.dispatch({
	type: ActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: "code"
	}
});

store.dispatch({
	type: ActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: "text"
	}
});

store.dispatch({
	type: ActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: "code"
	}
});

store.dispatch({
	type: ActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: "text"
	}
});
