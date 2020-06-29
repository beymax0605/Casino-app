import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import MainContainer from "../../components/MainContainer/MainContainer";
import {StoreType} from "../../redux/store.type";
import {getCategoriesSelector} from "../../redux/Category/selectors";
import {connect} from "react-redux";
import {CategoryDataInterface} from "../../redux/Category/types/category-data-interface";
import {bindActionCreators, Dispatch} from "redux";
import {SelectCategoryAction} from "../../redux/Category/types/select-category-action-type";

export function SiteRouter(props: { categories: CategoryDataInterface[], selectCategory: Function}) {
  const {categories, selectCategory} = props;
  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => {
          return (
            <Redirect to="/home" />
          )
        }}
      />
        <Switch>
          <Route path="/:id" children={<Child categories={categories} selectCategory={selectCategory}/>} />
        </Switch>
    </Router>
  );
}

function Child(props: { categories: CategoryDataInterface[], selectCategory: Function}) {
  const {categories, selectCategory} = props;
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  if(!categories.some(category => category.key === id)) {
    return <Redirect to="/home" />
  }
  selectCategory(id);
  return <MainContainer/>;
}

const mapStateToProps = (state: StoreType) => ({
  categories: getCategoriesSelector(state),
})

const selectCategoryAction = (value: string) => ({ type: SelectCategoryAction, payload: value })

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  selectCategory: selectCategoryAction
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteRouter);
