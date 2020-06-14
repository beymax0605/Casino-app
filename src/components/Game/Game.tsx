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

const Game = (props: { game: GameInterface, jackpots: JackpotStateInterface }) => {
  const { game, jackpots } = props;
  return (
      <div className="Game">
          <LazyLoad once={true} offset={100} height={150} debounce={500} placeholder={<Placeholder/>}>
            <div className="Game__container">
              <div className={`Game__container__ribbon`}>
                <span className="Game__container__ribbon__label">top
                </span>
              </div>
              <img src={game.image} alt={game.name}/>
              {showJackpot(jackpots.data, game)}
            </div>
          </LazyLoad>
      </div>
  );
}

function showJackpot(jackpotAggregate: JackpotsAggregate, game: GameInterface) {
  if(!jackpotAggregate.hasOwnProperty(game.id)) {
    return '';
  }
  return <span className="Game__container__jackpot">{jackpotAggregate[game.id].amount}</span>
}

const mapStateToProps = (state: StoreType) => ({
  jackpots: getJackpotsSelector(state)
})

export default connect(mapStateToProps)(Game);
