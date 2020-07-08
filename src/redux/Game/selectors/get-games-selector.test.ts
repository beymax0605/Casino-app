import * as data from "./get-games-selector/prepare-game-data";
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";
import {initialStateSelectCategory} from "../../Category/reducers/data/initial-state-select-category";
import {StoreType} from "../../store.type";
import getGames from "./get-games";
import {mockGames} from "./get-games-selector.test/mock-games";
import {GameStateInterface} from "../types/game-state-interface";
describe('get-games-selector', () => {
  let gamesState: GameStateInterface;
  beforeEach(() => {
    gamesState = {
      data: mockGames,
      pending: true,
      error: null,
      cache: false
    };
  });
  describe('scenario if cache is set or not', () => {
    let prepareGameDataSpy;
    let jackpots: JackpotsAggregate
    let store: StoreType;
    beforeEach(() => {
      jackpots = (new JackpotsAggregate());
      jackpots['NETHEWISHMASTER'] = {game: "NETHEWISHMASTER", amount: 1000};
      store = {
        games: gamesState,
        jackpots: { data: jackpots,  error: null },
        categories: initialStateSelectCategory
      }
    });
    it('cache is not set, call prepareGameData', () => {
      prepareGameDataSpy = jest.spyOn(data, 'prepareGameData');
      getGames(store);
      // @ts-ignore
      expect(prepareGameDataSpy).toHaveBeenCalled();
    })
    it('cache is set, not call prepareGameData', () => {
      prepareGameDataSpy = jest.spyOn(data, 'prepareGameData');
      store.games.cache = true;
      getGames(store);
      // @ts-ignore
      expect(prepareGameDataSpy).not.toHaveBeenCalled();
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});