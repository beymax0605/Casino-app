import React from 'react';
import { shallow } from 'enzyme';
import { Game } from "./Game";
import {JackpotsAggregate} from "../../core/aggregate/jackpots.aggregate";
import {JackpotStateInterface} from "../../redux/Jackpot/types/jackpot-state-interface";
import {GameInterface} from "../../core/models/game-interface";
import Ribbon from "./Ribbon/Ribbon";
import Jackpot from "./Jackpot/Jackpot";
import { render, screen, fireEvent, wait } from '@testing-library/react';
import {forceVisible} from "react-lazyload";
jest.mock("../../core/services/fetch-image.worker")
describe("Game Component", () => {
  let jackpotMock: JackpotStateInterface;
  let game: GameInterface;
  let imgUrl: string;
  beforeEach(() => {
    jackpotMock = {data: new JackpotsAggregate(), error: null};
    imgUrl = "https://casino-api-example.s3-eu-west-1.amazonaws.com/images/games/BSGHOULSGOLD.jpg";
    game = {
      categories: ['old'],
      id: 'test',
      image: imgUrl,
      name: 'Test Game',
    }
  });

  test('should test Game component', async () => {
    const { container, asFragment  } = render(<Game jackpots={jackpotMock} game={game} />)
    await wait(() => {
      forceVisible();
      expect(container.getElementsByClassName('Game__play-button').length).toBe(1);
      expect(container.getElementsByClassName('Game__container').length).toBe(1);
      expect(screen.getByTestId("image").getAttribute('src')).toBe(imgUrl);
      expect(container.querySelector('Ribbon')).toBeNull();
      expect(container.querySelector('Jackpot')).toBeNull();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('Ribbon new is showing', async () => {
    game.categories = ["new"];
    const { container, asFragment  } = render(<Game jackpots={jackpotMock} game={game} />)
    await wait(() => {
      forceVisible();
      expect(container.querySelector('Ribbon')).toBeDefined()
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('Jackpot is showing', async () => {
    jackpotMock.data["test"] = { game: "test", amount: 1000 };

    const { container, asFragment  } = render(<Game jackpots={jackpotMock} game={game} />)
    await wait(() => {
      forceVisible();
      expect(container.querySelector('Jackpot')).toBeDefined()
      expect(asFragment()).toMatchSnapshot();
    });
  });
});



