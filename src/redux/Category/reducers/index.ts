import {CategoryActionTypes} from "../types/action-types";
import {SelectCategoryAction} from "../types/select-category-action.type";
import {initialState} from "./data/initial-state";

const categoryReducer = (state= initialState, action: CategoryActionTypes) => {
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
