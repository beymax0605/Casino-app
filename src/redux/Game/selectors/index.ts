import {StoreType} from "../../store.type";
import getGameSelector from "./get-games.selector";

export const getGamesSelector = (state: StoreType) => getGameSelector(state);
