import React, {useEffect} from "react";
import "./MainContainer.scss"
import Game from "../Game/Game";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import fetchJackpots from "./services/fetch-jackpots";
import fetchGames from "./services/fetch-games";
import {getGamesSelector} from "../../redux/Game/selectors";
import {StoreType} from "../../redux/store.type";
import {GameStateInterface} from "../../redux/Game/types/game-state.interface";

const MainContainer = (props: { fetchJackpots: Function, fetchGames: Function , gameStore: GameStateInterface}) => {
  const {fetchJackpots, fetchGames, gameStore} = props;

  useEffect(() => {
    fetchGames();
    fetchJackpots();
  }, [fetchGames, fetchJackpots]);

  return (
    <div className="Main-Container">
      {renderGames(gameStore)}
    </div>
  );
}

function renderGames(game: GameStateInterface): string | JSX.Element[] {
  if(game.pending) {
    return "Loading ...."
  }

  const gamesCount = game.data.length;
  let renderGames = [];
  for (let i = 0; i < gamesCount; i++) {
    renderGames.push(<Game game={game.data[i]} key={i} />);
  }

  return renderGames;
}

const mapStateToProps = (state: StoreType) => ({
  gameStore: getGamesSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchJackpots: fetchJackpots,
  fetchGames: fetchGames,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
