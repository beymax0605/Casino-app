import {GamesActionTypes} from "../types";
import {FetchGamesAction} from "../types/fetch-games-action.type";
import {GameStateInterface} from "../types/game-state.interface";
import {CacheGamesAction} from "../types/cache-games-action.type";

const initialState: GameStateInterface = {
  data: [],
  pending: true,
  error: null,
  cache: false
};

const gameReducer = (state= initialState, action: GamesActionTypes) => {
  switch (action.type) {
    case FetchGamesAction: {
      return {
        ...state,
        pending: false,
        data: action.payload,
        cache: false
      };
    }
    case CacheGamesAction: {
      return {
        ...state,
        cache: true
      };
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
