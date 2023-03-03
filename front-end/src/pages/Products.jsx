import axios from 'axios';
import React, { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import getFromLocalStorage from '../utils/localStorage';

const ROLE_PRODUCTS = 'customer_products__';

const totalPrice = 0;

function Products() {
  const [products, setProducts] = useState([]);

  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');
  const userInfos = { name, role };

  useEffect(() => {
    const getProducts = async () => {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/customer/products',
        headers,
      });
      try {
        setProducts(response);
      } catch (e) {
        console.log(e);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="products">
      <NavBar userInfos={ userInfos } />
      <ul>
        {
          products.map((product, index) => (
            <ProductCard
              key={ `product-${index}` }
              product={ product }
            />
          ))
        }
      </ul>
      <button
        type="button"
        data-testid={ `${ROLE_PRODUCTS}Sbutton-cart` }
      >
        { `Ver Carrinho: R$ ${
          <p data-testid={ `${ROLE_PRODUCTS}checkout-bottom-value` }>{ totalPrice }</p>
        }` }
      </button>
    </div>
  );
}
export default Products;
