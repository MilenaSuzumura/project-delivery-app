import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

import getFromLocalStorage from '../utils/localStorage';

const CUSTOMER_TEST_ID = 'customer_checkout__';

const CUSTOMER_DATA_TEST_ID = 'customer_checkout__element-order-table-';
const DTI_ARR = [
  `${CUSTOMER_DATA_TEST_ID}item-number-`,
  `${CUSTOMER_DATA_TEST_ID}name-`,
  `${CUSTOMER_DATA_TEST_ID}quantity-`,
  `${CUSTOMER_DATA_TEST_ID}unit-price-`,
  `${CUSTOMER_DATA_TEST_ID}sub-total-`,
];

export default function Checkout() {
  const history = useHistory();
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');
  // const userId = getFromLocalStorage('user', 'id');
  const token = getFromLocalStorage('user', 'token');
  const userId = 3;

  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellerId, setSellerId] = useState(0);

  console.log(sellerId);

  const [sellers, setSellers] = useState([]);

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
    case 'seller':
      console.log(e.target.value);
      setSellerId(e.target);
      break;
    default:
      console.log('500');
    }
  };

  useEffect(() => {
    const getSellers = async () => {
      const headers = {
        'Content-Type': 'application/json',
      };

      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3001/seller',
          headers,
        });

        setSellers(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getSellers();
  }, []);

  const makeRequest = async () => {
    const products = [];
    cartItems.forEach((item) => {
      products.push({
        productId: Number(item.id),
        quantity: Number(item.quantity),
      });
    });

    const body = {
      userId: Number(userId),
      sellerId: 2,
      totalPrice: Number(totalPrice.replace(',', '.')),
      deliveryAddress,
      deliveryNumber: Number(deliveryNumber),
      products,
    };

    console.log(body);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/customer/checkout',
        data: body,
        headers,
      });
      history.push(`/customer/orders/${response.data}`);
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
                dataItem={ item }
                index={ i }
                testIds={ DTI_ARR }
                rmBtn
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
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            id="seller"
            // onChange={ (e) => changeInputValue(e) }
            data-testid={ `${CUSTOMER_TEST_ID}select-seller` }
          >
            {
              sellers.map((seller, i) => (
                <option
                  onSelect={ (e) => changeInputValue(e) }
                  id="seller"
                  key={ i }
                  value={ seller.id }
                  name={ seller.name }
                >
                  { seller.name }
                </option>
              ))
            }
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
