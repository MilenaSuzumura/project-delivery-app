import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderStatusCard from '../components/OrderStatusCard';
import fetchSimulator from '../utils/fetchSimulator';
import getFromLocalStorage from '../utils/localStorage';

function CustomerOrders() {
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getFetch = async () => {
      try {
        const data = await fetchSimulator();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    getFetch();
  }, []);

  return (
    <div>
      <NavBar userInfos={ { name, role } } />
      <h1>Customer Orders</h1>
      { orders.length && orders.map((order) => (
        <OrderStatusCard
          key={ order.id }
          orderInfo={ order }
        />
      )) }
    </div>
  );
}

export default CustomerOrders;
