import {StoreType} from "../../../store.type";
import {allCategories} from "../../../Category/reducers/data/initial-state-select-category";
import {GameInterface} from "../../../../core/models/game-interface";
import {CategoryInterface} from "../../../../core/models/category-interface";
import {GameStateInterface} from "../../types/game-state-interface";

export function prepareGameData(
  state: StoreType,
  selectCategory: string,
  cachedGames: Map<string, GameInterface[]>
): GameStateInterface
{
  cachedGames.clear();
  for (let category of state.categories.data) {
    if (category.key === 'home') {
      cachedGames.set(category.key, state.games.data);
      continue;
    }

    if (category.key === 'jackpots') {
      setJackpot(state, cachedGames);
      continue;
    }

    if (category.key === 'other') {
      setOtherGamesWhichCategoryDoesntExist(cachedGames, state);
      continue;
    }
    setGamesOnCurrentCategories(cachedGames, category, state);
  }

  return {
    pending: false,
    data: cachedGames.get(selectCategory) as GameInterface[],
    error: null,
    cache: false
  }
}

function setJackpot(state: StoreType, cachedGames: Map<string, GameInterface[]>) {
  const jackpotAggregate = state.jackpots.data

  cachedGames.set('jackpots', state.games.data.filter((game) => {
    return jackpotAggregate.hasOwnProperty(game.id)
  }));
}

function setOtherGamesWhichCategoryDoesntExist(cachedGames: Map<string, GameInterface[]>, state: StoreType) {
  cachedGames.set('other', state.games.data.filter((game) => {
    const length = game.categories.length;
    for (let i = 0; i < length; i++) {
      if (allCategories.includes(game.categories[i])) {
        return false;
      }
    }
    return true;
  }));
}

function setGamesOnCurrentCategories(cachedGames: Map<string, GameInterface[]>, category: CategoryInterface, state: StoreType) {
  cachedGames.set(category.key, state.games.data.filter((game) => {
    return game.categories.includes(category.key);
  }));
}
