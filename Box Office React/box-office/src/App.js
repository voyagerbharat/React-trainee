/* eslint-disable no-unused-vars */
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Navs from './Components/Navs';

function App() {
  // we define various route pages inside switch and in each route page we add components we want to show in that route
  return (
    <div>
      <Navs />
      <switch>
        <Route exact path="/123">
          hello
        </Route>
        <Route exact path="/best">
          Best Job
        </Route>
      </switch>
    </div>
  );
}

export default App;
