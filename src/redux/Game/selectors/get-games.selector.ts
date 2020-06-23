import {GameInterface} from "../../../core/models/game.interface";
import {allCategories} from "../../Category/reducers/data/initial-state";
import {StoreType} from "../../store.type";

let cachedGames = new Map<string, GameInterface[]>();
export default function getGameSelector(state: StoreType) {
  const selectCategory  = state.categories.selected;

  if(state.games.cache) {
    return {
      pending: false,
      data: cachedGames.get(selectCategory) as GameInterface[],
      error: null,
      cache: false
    }
  }

  for (let category of state.categories.data) {
    if (category.key === 'home') {
      cachedGames.set(category.key, state.games.data);
      continue;
    }

    if (category.key === 'jackpots') {
      const jackpotAggregate = state.jackpots.data

      cachedGames.set('jackpots', state.games.data.filter((game) => {
        return jackpotAggregate.hasOwnProperty(game.id)
      }));
      continue;
    }

    if(category.key === 'other') {
      cachedGames.set('other', state.games.data.filter((game) => {
        const length = game.categories.length;
        for (let i = 0; i < length; i++) {
          if (allCategories.includes(game.categories[i])) {
            return false;
          }
        }
        return true;
      }));
      continue;
    }

    cachedGames.set(category.key, state.games.data.filter((game) => {
      return game.categories.includes(category.key);
    }));
  }

  return {
    pending: false,
    data: cachedGames.get(selectCategory) as GameInterface[],
    error: null,
    cache: false
  }
}
