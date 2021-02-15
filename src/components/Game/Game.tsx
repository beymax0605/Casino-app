import React, {useEffect, useState} from "react";
import "./Game.scss";
import {GameInterface} from "../../core/models/game-interface";
import {connect} from "react-redux";
import {StoreType} from "../../redux/store.type";
import {getJackpotsSelector} from "../../redux/Jackpot/selectors";
import {JackpotStateInterface} from "../../redux/Jackpot/types/jackpot-state-interface";
import {JackpotsAggregate} from "../../core/aggregate/jackpots.aggregate";
import Ribbon from "./Ribbon/Ribbon";
import {Jackpot} from "./Jackpot/Jackpot";
import {FetchImageWorker} from "../../core/services/fetch-image.worker";
import LazyLoad from "react-lazyload";
import Placeholder from "../Placeholder/Placeholder";

export const Game = (props: { game: GameInterface, jackpots: JackpotStateInterface }) => {
  const { game, jackpots } = props;
  const [image, setImage] = useState("");
  useEffect(() => {
    (new FetchImageWorker()).handle(game.image).then(url => {
      setImage(url)
    }).catch(e => console.log(e));
  }, [game.image]);
  return (
    <>
      {image.length > 0 &&
      <div className="Game">
        <LazyLoad once={true} offset={100} height={150} placeholder={<Placeholder/>}>
          <div className="Game__container">
            {showNewRibbon(game)}
            <img data-testid="image" src={image} alt={game.name} onLoad={() => onLoad(image)}/>
            {showJackpot(jackpots.data, game)}
          </div>
          <div className="Game__play-button"></div>
        </LazyLoad>
      </div>
      }
    </>
  );
}

function onLoad(imageUrl: string) {
  URL.revokeObjectURL(imageUrl)
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
