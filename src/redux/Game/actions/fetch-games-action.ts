import {FetchGamesAction} from "../types/fetch-games-action.type";
import {GameInterface} from "../../../core/models/game.interface";

export function fetchGamesAction(games: GameInterface[]): FetchGamesAction {
  return {
    type: FetchGamesAction,
    payload: games
  }
}
