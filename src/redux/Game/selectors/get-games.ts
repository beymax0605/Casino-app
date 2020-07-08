import {GameInterface} from "../../../core/models/game-interface";
import {StoreType} from "../../store.type";
import {prepareGameData} from "./get-games-selector/prepare-game-data";
import {GameStateInterface} from "../types/game-state-interface";
let cachedGames = new Map<string, GameInterface[]>();

export default function getGames(state: StoreType): GameStateInterface {
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
