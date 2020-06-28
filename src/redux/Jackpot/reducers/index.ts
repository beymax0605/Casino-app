import {JackpotActionTypes} from "../types";
import {FetchJackpotAction} from "../types/fetch-jackpot-action.type";
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";
import {JackpotStateInterface} from "../types/jackpot-state.interface";
export const jackpotInitialState: JackpotStateInterface = { data: new JackpotsAggregate(), error: null};

const jackPotReducer = (state= jackpotInitialState, action: JackpotActionTypes) => {
  switch (action.type) {
    case FetchJackpotAction: {
      return {
        ...state,
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default jackPotReducer;
