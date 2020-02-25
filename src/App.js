import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import gaimr from './gaimr';
import trending from './trending';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={gaimr} />
      <Route exact path="/trending" component={trending} />
    </div>
    </Router>
  );
}

export default App;

