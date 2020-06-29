import React from 'react';
import {shallow} from "enzyme";
import Jackpot from "./Jackpot";

describe("Jackpot Component", () => {
  test('Test Jackpot component', () => {
    const wrapper = shallow(<Jackpot amount={1000} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.jackpot').length).toBe(1);
    expect(wrapper.find('.jackpot__container').length).toBe(1);
    expect(wrapper.find('.amount').length).toBe(1);
    expect(wrapper.find('.amount').text()).toBe("£1,000.00");
  });
});
