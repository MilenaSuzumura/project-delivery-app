import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import getFromLocalStorage from '../utils/localStorage';

const ROLE_PRODUCTS = 'customer_products__';

function Products() {
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const userInfos = { name, role };

  useEffect(() => {
    const handleStorageChange = () => {
      const getCartItems = () => JSON.parse(localStorage.getItem('cartItems'));
      const cartItemsLocalStorage = getCartItems();

      let total = 0;
      cartItemsLocalStorage.forEach((item) => {
        total += (item.quantity * item.price);
      });
      setTotalPrice(total.toFixed(2).toString().replace('.', ','));
    };

    window.addEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify([]));

    const getProducts = async () => {
      const headers = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'get',
        url: 'http://localhost:3001/customer/products',
        headers,
      });
      try {
        setProducts(data);
      } catch (e) {
        console.log(e);
      }
    };
    getProducts();
  }, []);

  const addToCart = (product) => {
    const item = cartItems.find((e) => e.id === product.id);

    if (item) {
      // Se o produto já existe no carrinho, atualiza a quantidade
      setCartItems(cartItems.map((e) => {
        if (e.id === product.id) { return { ...e, quantity: e.quantity + 1 }; }
        return item;
      }));
    } else {
      // Se o produto ainda não está no carrinho, adiciona um novo item
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  if (products) {
    return (
      <div className="products">
        <NavBar userInfos={ userInfos } />
        <ul>
          {
            products.map((product) => (
              <ProductCard
                key={ product.id }
                product={ product }
                addToCart={ addToCart }
              />
            ))
          }
        </ul>
        <button
          type="button"
          data-testid={ `${ROLE_PRODUCTS}button-cart` }
          onClick={ () => history.push('/customer/checkout') }
          disabled={ totalPrice === '0,00' }
        >
          {'Ver carrinho R$: '}
          <p data-testid={ `${ROLE_PRODUCTS}checkout-bottom-value` }>
            { totalPrice }
          </p>
        </button>
      </div>
    );
  }
}

export default Products;
