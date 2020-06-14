import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";
export const FetchJackpotAction = 'FetchJackpotAction'

export type FetchJackPotAction = {
  type: typeof FetchJackpotAction
  payload: JackpotsAggregate
}
