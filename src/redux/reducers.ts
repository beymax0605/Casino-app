import { combineReducers } from "redux";
import jackpots from "./Jackpot/reducers";
import games from "./Game/reducers";
import categories from "./Category/reducers";

export default combineReducers({ jackpots, games, categories });
