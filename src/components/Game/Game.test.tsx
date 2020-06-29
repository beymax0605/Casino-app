import React from 'react';
import { shallow } from 'enzyme';
import { Game } from "./Game";
import {JackpotsAggregate} from "../../core/aggregate/jackpots.aggregate";
import {JackpotStateInterface} from "../../redux/Jackpot/types/jackpot-state-interface";
import {GameInterface} from "../../core/models/game-interface";
import Ribbon from "./Ribbon/Ribbon";
import Jackpot from "./Jackpot/Jackpot";

describe("Game Component", () => {
  let jackpotMock: JackpotStateInterface;
  let game: GameInterface;
  let imgUrl: string;
  beforeEach(() => {
    jackpotMock = {data: new JackpotsAggregate(), error: null};
    imgUrl = "http://localhost:3000/test2";
    game = {
      categories: ['old'],
      id: 'test',
      image: imgUrl,
      name: 'Test Game',
    }
  });

  test('should test Game component', () => {
    const wrapper = shallow(<Game jackpots={jackpotMock} game={game} />);
    expect(wrapper.find('.Game__play-button').length).toBe(1);
    expect(wrapper.find('.Game__container').length).toBe(1);
    expect(wrapper.find("img").prop("src")).toEqual(imgUrl);
    expect(wrapper.find(Ribbon).length).toBe(0);
    expect(wrapper.find(Jackpot).length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });

  test('Ribbon new is showing', () => {
    game.categories = ["new"];
    const wrapper = shallow(<Game jackpots={jackpotMock} game={game} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Ribbon).length).toBe(1);
  });

  test('Jackpot is showing', () => {
    jackpotMock.data["test"] = { game: "test", amount: 1000 };
    const wrapper = shallow(<Game jackpots={jackpotMock} game={game} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Jackpot).length).toBe(1);
  });
});



