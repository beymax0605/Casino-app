import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer/MainContainer";

export default function App() {
  return (
    <div className="App">
      <Header/>
      <MainContainer/>
    </div>
  );
}
