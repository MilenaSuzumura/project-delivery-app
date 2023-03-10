import React from 'react';
// import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Provider from './context/Provider';

import Login from './pages/Login';
import Register from './pages/Register';
// import HomePage from './pages/HomePage';

import Products from './pages/Products';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import Admin from './pages/Admin';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/admin" component={ Admin } />
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />

          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetails } />
          {/* <Route exact path="/customer/homepage" component={ HomePage } /> */}

          <Route exact path="/seller/orders" component={ SellerOrders } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
