import App from "./App";
import {shallow} from "enzyme";
import React from 'react';
import Header from "./components/Header/Header";
import SiteRouter from "./core/SiteRouter/SiteRouter";
import { BrowserRouter as Router } from 'react-router-dom'
jest.mock("./redux/Services/fetch-games-and-jack-pots/getDataFromWorker.ts")
describe("App Component", () => {
  test('check the component what are used on App component', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(".App").length).toBe(1);
    expect(wrapper.find(Header).length).toBe(1);
    expect(wrapper.find(SiteRouter).length).toBe(1);
    expect(wrapper.find(Router).length).toBe(1);
  })
})
