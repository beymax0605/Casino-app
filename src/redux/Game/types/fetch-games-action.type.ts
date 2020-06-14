import {GameInterface} from "../../../core/models/game.interface";
export const FetchGamesAction = 'FetchGamesAction';

export type FetchGamesAction = {
  type: typeof FetchGamesAction
  payload: GameInterface[]
}
