import {StoreType} from "../../store.type";

export const getCategoriesSelector = (state: StoreType) => state.categories.data;
export const getActiveCategory = (state: StoreType) => state.categories.selected;
