import {FetchJackpotAction, FetchJackPotAction} from "../types/fetch-jackpot-action.type";
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";

export function fetchJackpotsAction(jackpots: JackpotsAggregate): FetchJackPotAction {
  return {
    type: FetchJackpotAction,
    payload: jackpots
  }
}
