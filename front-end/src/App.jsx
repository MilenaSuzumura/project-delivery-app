import React from 'react';
// import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
