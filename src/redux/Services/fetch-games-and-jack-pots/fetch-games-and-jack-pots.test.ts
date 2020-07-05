import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {FetchGamesAction} from "../../Game/types/fetch-games-action.type";
import {FetchJackpotAction} from "../../Jackpot/types/fetch-jackpot-action.type";
import {CacheGamesAction} from "../../Game/types/cache-games-action.type";
import fetchGamesAndJackPots from "./fetch-games-and-jack-pots";
import {jackpotAggregateStub, jackpotsDataStub} from "./fetch-games-and-jack-pots.test/jackpots.stub";
import {gamesStub} from "./fetch-games-and-jack-pots.test/games.stub";
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock.getOnce('https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/games', {
      body: gamesStub,
      headers: { 'content-type': 'application/json' }
    })

    fetchMock.getOnce('https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/jackpots', {
      body: jackpotsDataStub,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: FetchGamesAction, payload: gamesStub },
      { type: FetchJackpotAction, payload: jackpotAggregateStub },
      { type: CacheGamesAction },
    ]
    const store = mockStore();

    // @ts-ignore
    return store.dispatch(fetchGamesAndJackPots()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
