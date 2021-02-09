import React from "react";
import {SiteRouter} from "./SiteRouter";
import { createMemoryHistory } from "history";
import { render } from "react-dom";
import { Router } from "react-router";
jest.mock('./../../components/MainContainer/MainContainer')
jest.mock("./../../redux/Services/fetch-games-and-jack-pots/getDataFromWorker.ts")
describe("SiteRouter", () => {
  let root: HTMLDivElement;
  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  test('category exist', () => {
    expected("test", '/test');
  });

  test('trigger defauult route "/", go to "home" route', () => {
    expected("home", '/');
  });


  test('route not exist, go to "home" route', () => {
    expected("home", '/notExistRoute');
  });

  function expected(routeExist: string, triggerRoute: string) {
    const selectCategory = (category: string) => expect(category).toBe(routeExist);
    const categories = [{key: routeExist, value: routeExist}]

    const history = createMemoryHistory();
    history.push(triggerRoute)
    render(
      <Router history={history}>
        <SiteRouter categories={categories} selectCategory={selectCategory}/>
      </Router>,
      root
    );
    expect(history.location.pathname).toBe('/' + routeExist);
  }
});
