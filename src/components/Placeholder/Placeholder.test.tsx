import React from 'react';
import { shallow } from 'enzyme';
import Placeholder from "./Placeholder";

describe('Placeholder component', () => {
  it('Placeholder has all elements', () => {
    const wrapper = shallow(<Placeholder  />);
    expect(wrapper.find('.placeholder').length).toBe(1);
    expect(wrapper.find('.spinner').length).toBe(1);

    expect(wrapper.find('.rect1').length).toBe(1);
    expect(wrapper.find('.rect2').length).toBe(1);
    expect(wrapper.find('.rect3').length).toBe(1);
    expect(wrapper.find('.rect4').length).toBe(1);
    expect(wrapper.find('.rect5').length).toBe(1);

  })
});
