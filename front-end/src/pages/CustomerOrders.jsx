import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderStatusCard from '../components/OrderStatusCard';
import getFromLocalStorage from '../utils/localStorage';

const TIMEOUT = 1000;
const fetchSimulator = () => new Promise((resolve) => {
  setTimeout(() => {
    const data = [
      {
        id: 1,
        status: 'Pendente',
        saleDate: '08042021',
        total_price: 23.80,
      },
      {
        id: 20,
        status: 'Preparando',
        saleDate: '08042021',
        total_price: 14.20,
      },
      {
        id: 349,
        status: 'Entregue',
        saleDate: '07042021',
        total_price: 28.46,
      },
    ];
    resolve(data);
  }, TIMEOUT);
});

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
