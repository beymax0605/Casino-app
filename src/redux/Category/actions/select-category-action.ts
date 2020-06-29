import {SelectCategoryAction, SelectCategoryActionType} from "../types/select-category-action-type";

export function selectCategoryAction(category: string): SelectCategoryActionType {
  return {
    type: SelectCategoryAction,
    payload: category
  }
}
