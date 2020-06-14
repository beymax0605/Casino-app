import {Dispatch} from "redux";
import {fetchJackpotsAction} from "../../../redux/Jackpot/actions/fetch-jackpots-action";
import {JackpotsAggregate} from "../../../core/aggregate/jackpots.aggregate";

export default function fetchJackpots() {
  return async (dispatch: Dispatch) => {
    let data = await (await fetch("https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/jackpots")).json();

    const dataLength = data.length
    const jackAggregate = new JackpotsAggregate();
    for (let i = 0; i < dataLength; i++) {
      jackAggregate[data[i].game] = data[i];
    }
    dispatch(fetchJackpotsAction(jackAggregate))
  }
}
