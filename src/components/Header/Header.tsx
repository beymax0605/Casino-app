import React, {useState} from "react";
import "./Header.scss";
import {StoreType} from "../../redux/store.type";
import {connect} from "react-redux";
import {getActiveCategory, getCategoriesSelector} from "../../redux/Category/selectors";
import {CategoryDataInterface} from "../../redux/Category/types/category-data.interface";
import {bindActionCreators, Dispatch} from "redux";

const Header = (props: { categories: CategoryDataInterface[], activeCategory: string}) => {
  const {categories, activeCategory} = props;

  const [navigation, setNavigation] = useState(false);
  return (
    <header className="Header">
      <div className="Header__navigation-button">
        <button onClick={() => toggleNavigation(navigation, setNavigation)} className={buttonToggle(navigation)} type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <nav className={navigationToggle(navigation)}>
        {
          categories.map((el: CategoryDataInterface) =>
            <button key={el.key} className={buttonNavigationClass(activeCategory, el.key)}>{el.value}</button>
          )
        }
      </nav>
    </header>
  );
}

const buttonNavigationClass = (selected: string, currentCategoryKey: string) => {
  return selected === currentCategoryKey ? 'navigation__nav__link active' : 'navigation__nav__link'
}

const navigationToggle = (navigation: boolean) => {
  return navigation ? 'navigation__nav active' : 'navigation__nav'
}

const buttonToggle = (navigation: boolean) => {
  return navigation ? "hamburger hamburger--slider is-active" : "hamburger hamburger--slider";
}

const toggleNavigation = (navigation: boolean, setNavigation: Function) => {
  setNavigation(!navigation);
}

const mapStateToProps = (state: StoreType) => ({
  categories: getCategoriesSelector(state),
  activeCategory: getActiveCategory(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
