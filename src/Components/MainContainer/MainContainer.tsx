import React, {useEffect, useState} from "react";
import "./MainContainer.scss"
import Game from "../Game/Game";
import {GameModel} from "../../Core/Models/game.model";

export default () => {
  const [games, setGames] = useState<Array<GameModel>>([]);
  const [gamesCount, setGamesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getGames(setIsLoading, setGames, setGamesCount);
  }, []);

  return (
    <div className="Main-Container">
      {renderGames(games, gamesCount, isLoading)}
    </div>
  );
}

const getGames = async (setIsLoaded: Function, setGames: Function, setGamesCount: Function) => {
  try {
    let data = await (await fetch("https://nssw02zdf3.execute-api.us-east-1.amazonaws.com/games")).json();
    setIsLoaded(false);
    setGames(data);
    setGamesCount(data.length);
  } catch (e) {
    setIsLoaded(true);
    setGames([]);
    throw Error(e);
  }
};

function renderGames(games: Array<GameModel>, gamesCount: number, isLoading: boolean): string | JSX.Element[] {
  if(isLoading) {
    return "Loading ...."
  }

  let renderGames = [];
  for (let i = 0; i < gamesCount; i++) {
    const gameModel = new GameModel(
      games[i].categories,
      games[i].id,
      games[i].image,
      games[i].name,
    )
    renderGames.push(<Game game={gameModel} key={i} />);
  }

  return renderGames;
}
