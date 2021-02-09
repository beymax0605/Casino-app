import {Dispatch} from "redux";
import {fetchGamesAction} from "../../Game/actions/fetch-games-action";
import {cacheGameAction} from "../../Game/actions/cache-games-action";
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";
import {fetchJackpotsAction} from "../../Jackpot/actions/fetch-jackpots-action";
import {JackpotInterface} from "../../../core/models/jackpot-interface";
// eslint-disable-next-line import/no-webpack-loader-syntax
import GetJackpotsAndGamesWorker from "worker-loader!./getJackpotsAndGamesWorker";

export default function fetchGamesAndJackPots() {
  return async (dispatch: Dispatch) => {
    let posts = await getDataFromWorker() as any;
    dispatch(fetchGamesAction(posts.games));
    dispatch(fetchJackpotsAction(prepareJackpot(posts.jackpots)));
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

function getDataFromWorker() {
  return new Promise( (resolutionFunc, rejectionFunc) => {
    const worker = new GetJackpotsAndGamesWorker();
    worker.postMessage('run request');
    worker.onmessage = (event) => {
      resolutionFunc(event.data.data);
    };
  });
}
