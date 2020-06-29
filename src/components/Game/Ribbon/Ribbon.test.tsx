import React from 'react';
import {shallow} from "enzyme";
import Ribbon from "./Ribbon";

describe("Ribbon Component", () => {
  test('Test Ribbon component', () => {
    const type = "test";
    const wrapper = shallow(<Ribbon type={type} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.ribbon').length).toBe(1);
    expect(wrapper.find('.ribbon__label').length).toBe(1);
    expect(wrapper.find('.ribbon__label').text()).toBe(type);
  });
});
