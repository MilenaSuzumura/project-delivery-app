import React from 'react';
// import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
