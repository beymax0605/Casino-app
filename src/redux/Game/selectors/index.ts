import {StoreType} from "../../store.type";
import {GameInterface} from "../../../core/models/game.interface";
import {allCategories} from "../../Category/reducers/data/initial-state";

export const getGamesSelector = (state: StoreType) => {

  const selectCategory  = state.categories.selected;

  if (selectCategory === 'home') {
    return state.games
  }

  let data: GameInterface[] = [];
  if(selectCategory === 'other') {
    data = state.games.data.filter((game) => {
      const length = game.categories.length;
      for (let i = 0; i < length; i++) {
        if (allCategories.includes(game.categories[i])) {
          return false;
        }
      }
      return true;
    });

    return {
      pending: false,
      data: data,
      error: null
    }

  }

  if(selectCategory === 'jackpots') {
    const jackpotAggregate = state.jackpots.data

    data = state.games.data.filter((game) => {
      return jackpotAggregate.hasOwnProperty(game.id)
    });

    return {
      pending: false,
      data: data,
      error: null
    }
  }

  data = state.games.data.filter((game) => {
    return game.categories.includes(selectCategory);
  });

  return {
    pending: false,
    data: data,
    error: null
  }
};
