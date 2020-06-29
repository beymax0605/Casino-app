import {CategoryStateInterface} from "../../types/category-state-interface";
import {CategoryDataInterface} from "../../types/category-data-interface";

const data: CategoryDataInterface[] = [
  {key: "home", value: "Home"},
  {key: "new", value: "New Games"},
  {key: "slots", value: "Slots"},
  {key: "jackpots", value: "Jackpots"},
  {key: "live", value: "Live"},
  {key: "blackjack", value: "Blackjack"},
  {key: "roulette", value: "Roulette"},
  {key: "table", value: "Table"},
  {key: "poker", value: "Poker"},
  {key: "other", value: "Other"},
]

export const allCategories: Array<string> = ["home", "new", "slots", "jackpots", "live", "blackjack", "roulette", "table", "poker"]


export const initialState: CategoryStateInterface = {
  data: data,
  selected: "home"
};
