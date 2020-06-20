import React from 'react';
import './App.scss';
import MainContainer from "./components/MainContainer/MainContainer";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <div className="App">
      <Header/>
      <MainContainer/>
    </div>
  );
}
