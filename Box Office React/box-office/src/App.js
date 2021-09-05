/* eslint-disable no-unused-vars */
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

function App() {
  // we define various route pages inside switch and in each route page we add components we want to show in that route
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>
        <Route exact path="/show/:id">
          <Show />
        </Route>
      </Switch>
    </div>
  );
  // :id tells about dynamic route url
}

export default App;
