import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import { BrowserRouter as Router } from 'react-router-dom'
import SiteRouter from "./core/SiteRouter/SiteRouter";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <SiteRouter/>
      </Router>
    </div>
  );
}
