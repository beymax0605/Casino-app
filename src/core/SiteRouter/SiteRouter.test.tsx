import React from "react";
import {SiteRouter} from "./SiteRouter";
import { createMemoryHistory } from "history";
import { render } from "react-dom";
import { Router } from "react-router";
jest.mock('./../../components/MainContainer/MainContainer')

describe("SiteRouter", () => {
  let root: HTMLDivElement;
  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  test('category exist', () => {
    const routeKey = "test";
    const selectCategory = (category: string) => expect(category).toBe(routeKey);
    const categories = [{key: routeKey, value: "test"}]

    const history = createMemoryHistory();
    history.push(routeKey)
    render(
      <Router history={history}>
        <SiteRouter categories={categories} selectCategory={selectCategory}  />
      </Router >,
      root
    );
    expect(history.location.pathname).toBe('/'+routeKey);
  });

  test('trigger defauult route "/", go to "home" route', () => {
    const homeRoute = "home";
    const selectCategory = (category: string) => expect(category).toBe(homeRoute);
    const categories = [{key: homeRoute, value: homeRoute}]

    const history = createMemoryHistory();
    history.push('/')
    render(
      <Router history={history}>
        <SiteRouter categories={categories} selectCategory={selectCategory}  />
      </Router >,
      root
    );
    expect(history.location.pathname).toBe('/'+homeRoute);
  });


  test('route not exist, go to "home" route', () => {
    const homeRoute = "home";
    const selectCategory = (category: string) => expect(category).toBe(homeRoute);
    const categories = [{key: homeRoute, value: homeRoute}]

    const history = createMemoryHistory();
    history.push('/notExistRoute')
    render(
      <Router history={history}>
        <SiteRouter categories={categories} selectCategory={selectCategory}  />
      </Router >,
      root
    );
    expect(history.location.pathname).toBe('/'+homeRoute);
  });

});
