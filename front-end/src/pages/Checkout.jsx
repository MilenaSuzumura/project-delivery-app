import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

import getFromLocalStorage from '../utils/localStorage';

const CUSTOMER_TEST_ID = 'customer_checkout__';

export default function Checkout() {
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

    window.addEventListener('storage', handleStorageChange);

    handleStorageChange();
  }, []);

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
                id={ i + 1 }
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
        <div>
          <label
            data-testid={ `${CUSTOMER_TEST_ID}select-seller` }
            htmlFor="saller"
          >
            P. Vendedora Responsável:
            <input type="text" id="seller" required />
          </label>
          <label
            data-testid={ `${CUSTOMER_TEST_ID}input-address` }
            htmlFor="address"
          >
            Endereço:
            <input type="text" id="address" required />
          </label>
          <label
            data-testid={ `${CUSTOMER_TEST_ID}input-address-number` }
            htmlFor="number"
          >
            Número:
            <input type="text" id="number" required />
          </label>
          <button
            data-testid={ `${CUSTOMER_TEST_ID}button-submit-order` }
            type="button"
            onClick={ () => console.log('a') }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </form>
    </div>
  );
}
