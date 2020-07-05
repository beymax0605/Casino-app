import React from 'react';
import { shallow } from 'enzyme';
import {CategoryDataInterface} from "../../redux/Category/types/category-data-interface";
import {Header} from "./Header";
import {Link} from "react-router-dom";

describe("Game Component", () => {
  let categories: CategoryDataInterface[], activeCategory: string, selectCategory: any;
  beforeEach(() => {
    selectCategory = jest.fn();
    categories = [{key: "test", value: "test"}, {key: "test2", value: "test2"}];
    activeCategory = 'test';
  });

  test('show categories with Link Router component', () => {
    const wrapper = shallow(<Header selectCategory={selectCategory} categories={categories} activeCategory={activeCategory} />);
    expect(wrapper.find(Link).length).toBe(2);
  });

  test('check active category has active class', () => {
    const wrapper = shallow(<Header selectCategory={selectCategory} categories={categories} activeCategory={activeCategory} />);
    expect(wrapper.find('.navigation__nav__link').filter('.active').text()).toBe(activeCategory);
  });

  test('simulate event click call selectCategory function', () => {
    const wrapper = shallow(<Header selectCategory={selectCategory} categories={categories} activeCategory={activeCategory} />);
    const findNotActiveCategory = wrapper.find('.navigation__nav__link').filterWhere((n) => n.text() === 'test2');
    findNotActiveCategory.simulate('click');
    expect(selectCategory.mock.calls.length).toBe(1);
    expect(selectCategory.mock.calls[0][0]).toBe('test2');
  });

  test('click navigation-button to be active', () => {
    const wrapper = shallow(<Header selectCategory={selectCategory} categories={categories} activeCategory={activeCategory} />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').hasClass('is-active')).toBe(true);
  });
});



