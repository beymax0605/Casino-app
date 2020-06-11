import React from 'react';
import './App.scss';
import Header from "./Components/Header/Header";
import MainContainer from "./Components/MainContainer/MainContainer";

export default function App() {
  return (
    <div className="App">
      <Header/>
      <MainContainer/>
    </div>
  );
}
