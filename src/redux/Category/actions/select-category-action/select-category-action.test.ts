import {SelectCategoryAction} from "../../types/select-category-action-type";
import {selectCategoryAction} from "./select-category-action";

describe('select-category actions', () => {
  it('should create an action to select category', () => {
    const text = 'Home'
    const expectedAction = {
      type: SelectCategoryAction,
      payload: text
    }
    expect(selectCategoryAction(text)).toEqual(expectedAction)
  })
})
