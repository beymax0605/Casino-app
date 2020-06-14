import {Dispatch} from "redux";
import {fetchGamesAction} from "../../../redux/Game/actions/fetch-games-action";

export default function fetchGames() {
  return async (dispatch: Dispatch) => {
    let data = await (await fetch("https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/games")).json();
    dispatch(fetchGamesAction(data))
  }
}
