/* eslint-disable no-unused-vars */
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  // we define various route pages inside switch and in each route page we add components we want to show in that route
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
  // :id tells about dynamic route url
}

export default App;
