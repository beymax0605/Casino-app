import {Dispatch} from "redux";
import {fetchGamesAction} from "../../Game/actions/fetch-games-action";
import {cacheGameAction} from "../../Game/actions/cache-games-action";
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";
import {fetchJackpotsAction} from "../../Jackpot/actions/fetch-jackpots-action";
import {JackpotInterface} from "../../../core/models/jackpot-interface";

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
    const myWorker = new Worker('getJackpotsAndGamesWorker.js', {
      type: 'module'
    })
    myWorker.postMessage('run request');
    myWorker.onmessage = function (e) {
      resolutionFunc(e.data.data);
    }
  });
}
