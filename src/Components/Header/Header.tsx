import React, {useState} from "react";
import "./Header.scss";

export default () => {
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
        <button className="navigation__nav__link">HTML</button>
        <button className="navigation__nav__link">CSS</button>
        <button className="navigation__nav__link">JavaScript</button>
        <button className="navigation__nav__link">Python</button>
        <button className="navigation__nav__link">HTML</button>
        <button className="navigation__nav__link">CSS</button>
        <button className="navigation__nav__link">JavaScript</button>
        <button className="navigation__nav__link">Python</button>
        <button className="navigation__nav__link">HTML</button>
        <button className="navigation__nav__link">CSS</button>
        <button className="navigation__nav__link">JavaScript</button>
        <button className="navigation__nav__link">Python</button>
      </nav>
    </header>
  );
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
