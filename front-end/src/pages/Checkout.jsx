import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

import getFromLocalStorage from '../utils/localStorage';

const CUSTOMER_TEST_ID = 'customer_checkout__';

export default function Checkout() {
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');

  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const userInfos = { name, role };

  useEffect(() => {
    const handleStorageChange = () => {
      const items = JSON.parse(localStorage.getItem('cartItems'));
      setCartItems(items);

      let total = 0;
      items.forEach((item) => {
        total += (item.quantity * item.price);
      });
      setTotalPrice(total.toFixed(2).toString().replace('.', ','));
    };

    window.addEventListener('storage_checkout', handleStorageChange);

    handleStorageChange();
  }, []);

  const changeInputValue = (e) => {
    switch (e.target.id) {
    case 'address':
      setDeliveryAddress(e.target.value);
      break;
    case 'number':
      setDeliveryNumber(e.target.value);
      break;
    default:
      console.log('500');
    }
  };

  const makeRequest = async () => {
    const body = {
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    };

    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/customer/sales',
        data: body,
        headers,
      });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="checkout">
      <NavBar userInfos={ userInfos } />
      <h3>
        Finalizar Pedido
      </h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {
            cartItems.map((item, i) => (
              <OrderCard
                key={ i }
                cartItem={ item }
                id={ i }
              />
            ))
          }
        </tbody>
      </table>
      <h2
        data-testid="customer_checkout__element-order-total-price"
      >
        { `Total: R$ ${totalPrice}`}
      </h2>

      <h3>
        Detalhes e Endereço para Entrega
      </h3>
      <form>
        <label htmlFor="saller">
          P. Vendedora Responsável:
          <select id="saller" data-testid={ `${CUSTOMER_TEST_ID}select-seller` }>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>
        <label htmlFor="address">
          Endereço:
          <input
            type="text"
            id="address"
            value={ deliveryAddress }
            onChange={ (e) => changeInputValue(e) }
            data-testid={ `${CUSTOMER_TEST_ID}input-address` }
          />
        </label>
        <label htmlFor="number">
          Número:
          <input
            type="text"
            id="number"
            value={ deliveryNumber }
            onChange={ (e) => changeInputValue(e) }
            data-testid={ `${CUSTOMER_TEST_ID}input-address-number` }
          />
        </label>
        <button
          data-testid={ `${CUSTOMER_TEST_ID}button-submit-order` }
          type="button"
          onClick={ () => makeRequest() }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}
