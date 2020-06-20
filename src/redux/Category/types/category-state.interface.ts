import {CategoryDataInterface} from "./category-data.interface";

export interface CategoryStateInterface {
  data: Array<CategoryDataInterface>
  selected: string
}
