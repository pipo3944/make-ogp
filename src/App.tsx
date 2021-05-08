import React from 'react';
import logo from './logo.svg';
import { Switch, Route, Redirect } from 'react-router';
import './App.css';

function App() {
  return (
    <Switch>
      <Redirect from='/_stock/:stockid' to='/stock/:stockid' />
    </Switch>
  );
}

export default App;
