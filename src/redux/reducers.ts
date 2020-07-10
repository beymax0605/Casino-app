import { combineReducers } from "redux";
import jackpots from "./Jackpot/reducers";
import games from "./Game/reducers/game-reducer";
import categories from "./Category/reducers";

export default combineReducers({ jackpots, games, categories });
