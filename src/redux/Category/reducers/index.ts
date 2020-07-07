import {CategoryActionTypes} from "../types/action-types";
import {SelectCategoryAction} from "../types/select-category-action-type";
import {initialStateSelectCategory} from "./data/initial-state-select-category";

const categoryReducer = (state= initialStateSelectCategory, action: CategoryActionTypes) => {
  switch (action.type) {
    case SelectCategoryAction: {
      return {
        ...state,
        selected: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default categoryReducer;
