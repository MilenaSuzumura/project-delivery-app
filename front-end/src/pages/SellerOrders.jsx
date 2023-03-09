import axios from 'axios';
import { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import SellerOrderCard from '../components/SellerOrderCard';

import getFromLocalStorage from '../utils/localStorage';

function CustomerOrders() {
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getFetch = async () => {
      const headers = { 'Content-Type': 'application/json' };
      const userId = JSON.parse(localStorage.getItem('user')).id;

      if (userId) {
        try {
          const { data } = await axios({
            method: 'post',
            url: 'http://localhost:3001/customer/orders/',
            data: { userId },
            headers,
          });
          setOrders(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getFetch();
  }, []);

  return (
    <div>
      <NavBar userInfos={ { name, role } } />
      <h1>Seller Orders</h1>
      { orders.length > 0 && orders.map((order) => (
        <SellerOrderCard
          key={ order.id }
          orderInfo={ order }
        />
      )) }
    </div>
  );
}

export default CustomerOrders;
