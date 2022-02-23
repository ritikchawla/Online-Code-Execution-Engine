import { combineReducers } from "redux";
import bundlesReducer from "./bundlesReducer";
import cellsReducer from "./cellReducer";

const combinedReducers = combineReducers({
	cells: cellsReducer,
	bundles: bundlesReducer
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
