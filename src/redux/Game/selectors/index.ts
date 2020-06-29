import {StoreType} from "../../store.type";
import getGameSelector from "./getGameSelector";

export const getGamesSelector = (state: StoreType) => getGameSelector(state);
