import React, { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard'

const userInfos = {
  name: localStorage.getItem('name'),
  role: localStorage.getItem('role'),
};

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      // 'autorization': localStorage.getItem('token'),
    };

    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/customer/products',
        headers,
      });
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
          products.map((product) => {
            <li>
              <ProductCard product={ product } />
            </li>   
          })
        }
      </ul>
    </div>
  );
}
export default Products;
