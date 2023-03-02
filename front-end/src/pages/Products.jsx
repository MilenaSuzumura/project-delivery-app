import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

const userInfos = {
  name: 'temp',
  role: 'customer',
};

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/products',
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
          products.map(() => {
            <li>

            </li>   
          })
        }
      </ul>
    </div>
  );
}
export default Products;

/*
  const login = async () => {
    const body = {
      email: emailValue,
      password: passwordValue,
    };

    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: body,
        headers,
      });
      // user = { name, email, role}
      const { user } = response.data;

      if (user.role === CUSTOMER) {
        localStorage.setItem('user', JSON.stringify(user));
        // history.push('/customer/products');
      }
    } catch (e) {
      setErrorMessage(e.message);
      setLoginResponse(false);
    }
  };
*/

// localStorage.getItem('role');
