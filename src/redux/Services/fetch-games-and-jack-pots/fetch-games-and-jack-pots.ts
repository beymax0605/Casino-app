import {Dispatch} from "redux";
import {fetchGamesAction} from "../../Game/actions/fetch-games-action";
import {cacheGameAction} from "../../Game/actions/cache-games-action";
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";
import {fetchJackpotsAction} from "../../Jackpot/actions/fetch-jackpots-action";
import {JackpotInterface} from "../../../core/models/jackpot-interface";

export default function fetchGamesAndJackPots() {
  return async (dispatch: Dispatch) => {
    const urls = [
      "https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/games",
      "https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/jackpots",
    ];
    let response = await Promise.all(urls.map(url=>fetch(url)));
    let data = await Promise.all(response.map(res => res.json()));
    dispatch(fetchGamesAction(data[0]));
    dispatch(fetchJackpotsAction(prepareJackpot(data[1])));
    dispatch(cacheGameAction());
  }
}

export function prepareJackpot(data: JackpotInterface[]) {
  const dataLength = data.length;
  const jackAggregate = new JackpotsAggregate();
  for (let i = 0; i < dataLength; i++) {
    jackAggregate[data[i].game] = data[i];
  }
  return jackAggregate;
}
