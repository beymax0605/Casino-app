import {GameInterface} from "../../../core/models/game.interface";

export interface GameStateInterface {
  pending: boolean,
  data: GameInterface[],
  error: null
}
