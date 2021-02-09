import React from 'react';
import {mount, shallow} from 'enzyme';
import {GameStateInterface} from "../../redux/Game/types/game-state-interface";
import Game from "../Game/Game";
import {MainContainer} from "./MainContainer";
jest.mock("./../../redux/Services/fetch-games-and-jack-pots/getDataFromWorker.ts")

describe("MainContainer Component", () => {
  test('should show spinner if data is empty', () => {
    const fetchGames = () => {};
    const gameStore: GameStateInterface = {
      data: [],
      pending: true,
      error: null,
      cache: false
    };
    const wrapper = mount(<MainContainer fetchGames={fetchGames} gameStore={gameStore}/>);
    expect(wrapper.find(".loading").length).toBe(1);
    expect(wrapper.find(Game).length).toBe(0);
  });

  test('Should not show spinner if data is not empty', () => {
    const fetchGames = () => {};
    const gameStore: GameStateInterface = {
      data: [{
        "categories": [
          "slots"
        ],
        "name": "Super Safari",
        "image": "https://casino-api-example.s3-eu-west-1.amazonaws.com/images/games/NYXSUPERSAFARI.jpg",
        "id": "NYXSUPERSAFARI"
      },
        {
          "categories": [
            "slots"
          ],
          "name": "Green Lantern",
          "image": "https://casino-api-example.s3-eu-west-1.amazonaws.com/images/games/NYXGREENLANTERN.jpg",
          "id": "NYXGREENLANTERN"
        }],
      pending: false,
      error: null,
      cache: false
    };
    const wrapper = shallow(<MainContainer fetchGames={fetchGames} gameStore={gameStore}/>);
    expect(wrapper.find(Game).length).toBe(2);
  });
});



