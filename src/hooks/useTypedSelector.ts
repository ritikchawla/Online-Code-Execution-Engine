import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state/reducers/combineReducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
