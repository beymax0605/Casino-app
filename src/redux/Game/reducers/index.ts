import {GamesActionTypes} from "../types";
import {FetchGamesAction} from "../types/fetch-games-action.type";
import {GameStateInterface} from "../types/game-state.interface";

const initialState: GameStateInterface = {
  data: [],
  pending: true,
  error: null
};

const gameReducer = (state= initialState, action: GamesActionTypes) => {
  switch (action.type) {
    case FetchGamesAction: {
      return {
        ...state,
        pending: false,
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
