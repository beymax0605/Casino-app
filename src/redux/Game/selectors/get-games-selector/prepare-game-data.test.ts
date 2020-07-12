import {mockGames} from "../../mock/mock-games";
import {GameStateInterface} from "../../types/game-state-interface";
import {JackpotsAggregate} from "../../../../core/aggregate/jackpots.aggregate";
import {StoreType} from "../../../store.type";
import {initialStateSelectCategory} from "../../../Category/reducers/data/initial-state-select-category";
import {prepareGameData} from "./prepare-game-data";
import {GameInterface} from "../../../../core/models/game-interface";
let cachedGames = new Map<string, GameInterface[]>();

describe('prepare-game-data', () => {
  let gamesState: GameStateInterface;
  let jackpots: JackpotsAggregate
  let store: StoreType;
  beforeEach(() => {
    gamesState = {
      data: mockGames,
      pending: true,
      error: null,
      cache: false
    };

    jackpots = (new JackpotsAggregate());
    jackpots[mockGames[0].id] = {game: mockGames[0].id, amount: 1000};

    store = {
      games: gamesState,
      jackpots: { data: jackpots,  error: null },
      categories: initialStateSelectCategory
    }
  });

  it('home category return all games', () => {
      const result = prepareGameData(store, 'home', cachedGames);
      expect(result.data.length).toBe(mockGames.length);
  })

  it('jackpot category return one game', () => {
    const result = prepareGameData(store, 'jackpots', cachedGames);
    expect(result.data.length).toBe(1);
  })

  it('other category return one game', () => {
    const result = prepareGameData(store, 'other', cachedGames);
    expect(result.data.length).toBe(1);
  })
});
