import reducer from './index'
import {categoryData, initialStateSelectCategory} from "./data/initial-state-select-category";
import {SelectCategoryAction} from "../types/select-category-action-type";

describe("select-category-action", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialStateSelectCategory);
  })

  it('should handle select category', () => {
    expect(reducer(
      undefined,
      {
        type: SelectCategoryAction,
        payload: "toni"
      }
      ))
      .toEqual({ data: categoryData,  selected: "toni" });
  });
});
