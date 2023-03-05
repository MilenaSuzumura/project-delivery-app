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

  const [carItems, setCarItems] = useState([]);
  const [itemsToRender, setItemsToRender] = useState([]);

  const userInfos = { name, role };
  // console.log(carItems);
  useEffect(() => {
    setCarItems(JSON.parse(getFromLocalStorage('carItems')));
    const test = carItems.some((e) => e.itemAmount > 0);
    console.log(test);
    if (test) {
      const filteredItems = carItems.filter((carItem) => carItem.itemAmount > 0);
      setItemsToRender(filteredItems);
    }
  }, [carItems]);

  return (
    <div className="checkout">
      <NavBar userInfos={ userInfos } />
      { itemsToRender.map((carItem) => (
        <OrderCard key={ carItem.id } carItems={ carItem } />
      )) }
    </div>
  );
}
