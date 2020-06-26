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

export const Game = (props: { game: GameInterface, jackpots: JackpotStateInterface }) => {
  const { game, jackpots } = props;
  return (
      <div className="Game">
          <LazyLoad once={true} offset={100} height={150} debounce={200} placeholder={<Placeholder/>}>
            <div className="Game__container">
              {showTopRibbon(game)}
              <img src={game.image} alt={game.name}/>
              {showJackpot(jackpots.data, game)}
            </div>
            <div className="Game__play-button"></div>
          </LazyLoad>
      </div>
  );
}

function showTopRibbon(game: GameInterface) {
  if(!game.categories.includes("new")) {
    return '';
  }

  return (
    <div className={`Game__container__ribbon`}>
      <span className="Game__container__ribbon__label">new
      </span>
    </div>
  );
}

function showJackpot(jackpotAggregate: JackpotsAggregate, game: GameInterface) {
  if(!jackpotAggregate.hasOwnProperty(game.id)) {
    return '';
  }
  return (
    <div className="Game__container__jackpot">
      <span>{currencyFormat(jackpotAggregate[game.id].amount)}</span>
    </div>
  );
}

function currencyFormat(amount: number) {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  }).format(amount)
}

const mapStateToProps = (state: StoreType) => ({
  jackpots: getJackpotsSelector(state)
})

export default connect(mapStateToProps)(Game);
