import React, {useEffect, useState} from "react";
import "./MainContainer.scss"
import Game from "../Game/Game";
import Spinner from "../Spinner/Spinner";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import fetchGamesAndJackPots from "../../redux/Services/fetch-games-and-jack-pots/fetch-games-and-jack-pots";
import {StoreType} from "../../redux/store.type";
import {GameStateInterface} from "../../redux/Game/types/game-state-interface";
import getGamesSelector from "../../redux/Game/selectors/get-games-selector";

export const MainContainer = (props: {fetchGames: Function , gameStore: GameStateInterface}) => {
  const {fetchGames, gameStore} = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    renderGames(gameStore, {loading, setLoading, setGames});
    // eslint-disable-next-line
  }, [gameStore]);

  return (
    <>
      <Spinner pending={loading}/>
      <div className={`Main-Container ${loading ? "hidden" : ""}`}>
        {games.length > 0 && games}
      </div>
    </>
  );
}

function renderGames(game: GameStateInterface, props: {loading: boolean, setLoading: Function, setGames: Function}): void {
  const {loading, setLoading, setGames} = props
  if(!loading) {
    setLoading(true);
  }
  const gamesCount = game.data.length;
  let renderGamesArray: JSX.Element[] = [];
  for (let i = 0; i < gamesCount; i++) {
    renderGamesArray.push(<Game game={game.data[i]} key={i} />);
  }

  let time = Math.trunc(gamesCount / 50);
  if(time > 4) {
    time = 4
  }
  setTimeout(() => setLoading(false), time * 1000);

  setGames(renderGamesArray);
}

const mapStateToProps = (state: StoreType) => ({
  gameStore: getGamesSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchGames: fetchGamesAndJackPots,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
