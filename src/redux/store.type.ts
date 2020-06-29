import {GameStateInterface} from "./Game/types/game-state-interface";
import {JackpotStateInterface} from "./Jackpot/types/jackpot-state-interface";
import {CategoryStateInterface} from "./Category/types/category-state-interface";

export type StoreType = {
  jackpots: JackpotStateInterface,
  games: GameStateInterface,
  categories: CategoryStateInterface
}
