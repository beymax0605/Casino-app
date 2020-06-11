import React from "react";
import "./Game.scss";
import {GameModel} from "../../Core/Models/game.model";

export default (props: { game: GameModel }) => {
  const { game } = props;
  return (
    <div className="Game">
      <div className="Game__container">
        <div className="Game__container__ribbon">
            <span className="Game__container__ribbon__label">top
            </span>
        </div>
        <img src={game.image} alt=""/>
      </div>
    </div>
  );
}
