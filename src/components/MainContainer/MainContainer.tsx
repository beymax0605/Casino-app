import React, {useEffect} from "react";
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

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <div className="Main-Container">
      <Spinner pending={gameStore.pending}/>
      {renderGames(gameStore)}
    </div>
  );
}

function renderGames(game: GameStateInterface): JSX.Element[] {
  const gamesCount = game.data.length;
  let renderGamesArray = [];
  for (let i = 0; i < gamesCount; i++) {
    renderGamesArray.push(<Game game={game.data[i]} key={i} />);
  }

  return renderGamesArray;
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
