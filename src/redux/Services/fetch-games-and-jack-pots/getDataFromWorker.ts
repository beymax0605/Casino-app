/* eslint import/no-webpack-loader-syntax: off */
import GetJackpotsAndGamesWorker from "worker-loader!./getJackpotsAndGamesWorker.worker";

export default function getDataFromWorker() {
  return new Promise( (resolutionFunc, rejectionFunc) => {
    const worker = new GetJackpotsAndGamesWorker();
    worker.postMessage('run request');
    worker.onmessage = (event) => {
      resolutionFunc(event.data.data);
    };
  });
}
