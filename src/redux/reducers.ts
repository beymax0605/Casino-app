import { combineReducers } from "redux";
import jackpots from "./Jackpot/reducers";
import games from "./Game/reducers";

export default combineReducers({ jackpots, games });
