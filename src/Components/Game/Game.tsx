import React from "react";
import "./Game.scss";
import {GameModel} from "../../Core/Models/game.model";
import LazyLoad from 'react-lazyload';
import Placeholder from "../Placeholder/Placeholder";

export default (props: { game: GameModel }) => {
  const { game } = props;
  return (
      <div className="Game">
        <div className="Game__container">
          <LazyLoad once={true} offset={100} height={150} debounce={500} placeholder={<Placeholder/>}>
              <div className={`Game__container__ribbon`}>
                <span className="Game__container__ribbon__label">top
                </span>
              </div>
              <img src={game.image} alt={game.name}/>
          </LazyLoad>
        </div>
      </div>
  );
}
