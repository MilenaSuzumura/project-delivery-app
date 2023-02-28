import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={ Login } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
