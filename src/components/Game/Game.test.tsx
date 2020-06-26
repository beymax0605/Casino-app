import React from 'react';
import { shallow } from 'enzyme';
import { Game } from "./Game";
import {JackpotsAggregate} from "../../core/aggregate/jackpots.aggregate";

test('should test Game component', () => {

  const jackpotMock = {data: new JackpotsAggregate(), error: null};
  const game = {
    categories: ['string'],
    id: 'test',
    image: 'test',
    name: 'test',
  }
  const wrapper = shallow(<Game jackpots={jackpotMock} game={game} />);
  expect(wrapper).toMatchSnapshot();
});
