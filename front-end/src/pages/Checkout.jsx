// import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import getFromLocalStorage from '../utils/localStorage';

// const CHECKOUT = 'customer_checkout__';
// const ELEMENT = 'element-order-';

export default function Checkout() {
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');
  // const history = useHistory();

  const [cartItems, setCartItems] = useState([]);
  const [itemsToRender, setItemsToRender] = useState([]);

  const userInfos = { name, role };
  // console.log(cartItems);
  useEffect(() => {
    setCartItems(JSON.parse(getFromLocalStorage('cartItems')));
    const test = cartItems.some((e) => e.quantity > 0);
    console.log(test);
    if (test) {
      const filteredItems = cartItems.filter((cartItem) => cartItem.quantity > 0);
      setItemsToRender(filteredItems);
    }
  }, [cartItems]);

  return (
    <div className="checkout">
      <NavBar userInfos={ userInfos } />
      { itemsToRender.map((cartItem) => (
        <OrderCard key={ cartItem.id } cartItems={ cartItem } />
      )) }
    </div>
  );
}
