import {Dispatch} from "redux";
import {fetchGamesAction} from "../../../redux/Game/actions/fetch-games-action";
import {cacheGameAction} from "../../../redux/Game/actions/cache-games-action";
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";
import {fetchJackpotsAction} from "../../../redux/Jackpot/actions/fetch-jackpots-action";

export default function fetchGamesAndJackPots() {
  return async (dispatch: Dispatch) => {
    const urls = [
      "https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/games",
      "https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/jackpots",
    ];
    let response = await Promise.all(urls.map(url=>fetch(url)));
    let data = await Promise.all(response.map(res => res.json()));
    dispatch(fetchGamesAction(data[0]));

    const dataLength = data[1].length
    const jackAggregate = new JackpotsAggregate();
    for (let i = 0; i < dataLength; i++) {
      jackAggregate[data[1][i].game] = data[1][i];
    }
    dispatch(fetchJackpotsAction(jackAggregate));
    dispatch(cacheGameAction());
  }
}
