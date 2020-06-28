import React from "react";
import "./Game.scss";
import {GameInterface} from "../../core/models/game.interface";
import LazyLoad from 'react-lazyload';
import Placeholder from "../Placeholder/Placeholder";
import {connect} from "react-redux";
import {StoreType} from "../../redux/store.type";
import {getJackpotsSelector} from "../../redux/Jackpot/selectors";
import {JackpotStateInterface} from "../../redux/Jackpot/types/jackpot-state.interface";
import {JackpotsAggregate} from "../../core/aggregate/jackpots.aggregate";
import Ribbon from "./Ribbon/Ribbon";
import {Jackpot} from "./Jackpot/Jackpot";

export const Game = (props: { game: GameInterface, jackpots: JackpotStateInterface }) => {
  const { game, jackpots } = props;
  return (
      <div className="Game">
          <LazyLoad once={true} offset={100} height={150} debounce={200} placeholder={<Placeholder/>}>
            <div className="Game__container">
              {showNewRibbon(game)}
              <img src={game.image} alt={game.name}/>
              {showJackpot(jackpots.data, game)}
            </div>
            <div className="Game__play-button"></div>
          </LazyLoad>
      </div>
  );
}

function showNewRibbon(game: GameInterface): string | JSX.Element {
  if(!game.categories.includes("new")) {
    return '';
  }
  return <Ribbon type="new" />;
}

function showJackpot(jackpotAggregate: JackpotsAggregate, game: GameInterface) {
  if(!jackpotAggregate.hasOwnProperty(game.id)) {
    return '';
  }
  return (
    <Jackpot amount={jackpotAggregate[game.id].amount} />
  );
}

const mapStateToProps = (state: StoreType) => ({
  jackpots: getJackpotsSelector(state)
})

export default connect(mapStateToProps)(Game);
