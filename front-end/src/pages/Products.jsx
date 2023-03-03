import axios from 'axios';
import React, { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import getFromLocalStorage from '../utils/localStorage';

const ROLE_PRODUCTS = 'customer_products__';

function Products() {
  const [products, setProducts] = useState([]);

  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');

  const [totalPrice, setTotalPrice] = useState(localStorage.getItem('myKey'));

  const userInfos = { name, role };

  useEffect(() => {
    const handleStorageChange = () => {
      const carItems = JSON.parse(localStorage.getItem('carItems'));

      let total = 0;
      carItems.forEach((item) => {
        total += (item.itemAmount * item.price);
      });
      setTotalPrice(total);
    };

    window.addEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
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

    localStorage.setItem('carItems', JSON.stringify([]));
  }, []);

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
              />
            ))
          }
        </ul>
        <button
          type="button"
          data-testid={ `${ROLE_PRODUCTS}Sbutton-cart` }
        >
          <p>
            { 'Ver Carrinho: R$ ' }
          </p>
          <p data-testid={ `${ROLE_PRODUCTS}checkout-bottom-value` }>
            { totalPrice }
          </p>
        </button>
      </div>
    );
  }
}

export default Products;
