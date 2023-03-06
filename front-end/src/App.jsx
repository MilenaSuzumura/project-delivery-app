import React, { useEffect, useState } from 'react';
// import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';

import getFromLocalStorage from './utils/localStorage';

function App() {
  const [notLogged, setNotLogged] = useState();

  useEffect(() => {
    const isTokenEmpty = getFromLocalStorage('user', 'token');
    if (isTokenEmpty === '') setNotLogged(true);
    else setNotLogged(false);
  }, [setNotLogged]);

  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route
            exact
            path="/login"
            render={
              notLogged ? () => <Login /> : () => <Redirect to="/customer/orders" />
            }
          />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
