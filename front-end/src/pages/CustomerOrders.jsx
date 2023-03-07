import NavBar from '../components/NavBar';
import OrderStatusCard from '../components/OrderStatusCard';
import getFromLocalStorage from '../utils/localStorage';

function CustomerOrders() {
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');

  const orders = [
    {
      id: 1,
      status: 'Pendente',
      date: '08042021',
      price: 23.80,
    },
    {
      id: 20,
      status: 'Preparando',
      date: '08042021',
      price: 14.20,
    },
    {
      id: 349,
      status: 'Entregue',
      date: '07042021',
      price: 28.46,
    },
  ];

  return (
    <div>
      <NavBar userInfos={ { name, role } } />
      <h1>Customer Orders</h1>
      { orders.map((order) => (
        <OrderStatusCard
          key={ order.id }
          orderInfo={ order }
        />
      )) }
    </div>
  );
}

export default CustomerOrders;
