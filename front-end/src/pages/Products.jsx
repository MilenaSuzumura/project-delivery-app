import axios from 'axios';
import React, { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import getFromLocalStorage from '../utils/localStorage';

function Products() {
  const [products, setProducts] = useState([]);
  const [userInfos, setUserInfos] = useState();
  // const [authorization, setAuthorization] = useState('');

  useEffect(() => {
    // const token = getFromLocalStorage('token');
    const name = getFromLocalStorage('user', 'name');
    const role = getFromLocalStorage('user', 'role');

    // setAuthorization(token);
    setUserInfos({ name, role });
  }, []);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      // authorization,
    };

    const fetch = async () => {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/customer/products',
        headers,
      });

      return response;
    };

    try {
      const response = fetch();
      const { productsList } = response.data;
      setProducts(productsList);
    } catch (e) {
      setErrorMessage(e.message);
    }
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
    </div>
  );
}
export default Products;
