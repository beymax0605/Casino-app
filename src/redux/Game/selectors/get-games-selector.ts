import {StoreType} from "../../store.type";
import {GameStateInterface} from "../types/game-state-interface";
import {GameInterface} from "../../../core/models/game-interface";
import {prepareGameData} from "./get-games-selector/prepare-game-data";
let cachedGames = new Map<string, GameInterface[]>();
export default function getGamesSelector(state: StoreType): GameStateInterface {
  const selectCategory  = state.categories.selected;

  if(state.games.cache) {
    return {
      pending: false,
      data: cachedGames.get(selectCategory) as GameInterface[],
      error: null,
      cache: false
    }
  }

  return prepareGameData(state, selectCategory, cachedGames);
}
