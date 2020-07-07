import reducer, {jackpotInitialState} from './index'
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";
import {FetchJackpotAction} from "../types/fetch-jackpot-action.type";

describe("select-category-action", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(jackpotInitialState);
  })

  it('should handle add jackpots', () => {
    const jackpots = new JackpotsAggregate();
    jackpots['test'] = {game: "test", amount: 1000};
    expect(reducer(
      jackpotInitialState,
      {
        type: FetchJackpotAction,
        payload: jackpots
      }
    ))
      .toEqual({ data: jackpots,  error: null });
  });
});
