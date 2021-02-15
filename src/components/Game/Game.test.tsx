import React from 'react';
import { shallow } from 'enzyme';
import { Game } from "./Game";
import {JackpotsAggregate} from "../../core/aggregate/jackpots.aggregate";
import {JackpotStateInterface} from "../../redux/Jackpot/types/jackpot-state-interface";
import {GameInterface} from "../../core/models/game-interface";
import Ribbon from "./Ribbon/Ribbon";
import Jackpot from "./Jackpot/Jackpot";
const flushPromises = () => new Promise(setImmediate);
jest.mock("./../../core/services/fetch-image.worker.ts")
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
    const wrapper = shallow(<Game jackpots={jackpotMock} game={game} />);
    wrapper.setProps({ image: imgUrl });
    setTimeout(() => {
      expect(wrapper.find('.Game__play-button').length).toBe(1);
      expect(wrapper.find('.Game__container').length).toBe(1);
      expect(wrapper.find("img").prop("src")).toEqual(imgUrl);
      expect(wrapper.find(Ribbon).length).toBe(0);
      expect(wrapper.find(Jackpot).length).toBe(0);
      expect(wrapper).toMatchSnapshot();
    }, 0);
  });

  test('Ribbon new is showing', async () => {
    game.categories = ["new"];
    const wrapper = shallow(<Game jackpots={jackpotMock} game={game} />);
    wrapper.setProps({ image: imgUrl });
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Ribbon).length).toBe(1);
    }, 0);
  });

  test('Jackpot is showing', async () => {
    jackpotMock.data["test"] = { game: "test", amount: 1000 };
    const wrapper = shallow(<Game jackpots={jackpotMock} game={game} />);
    wrapper.setProps({ image: imgUrl });
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Jackpot).length).toBe(1);
    }, 0);
  });
});



