import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import getFromLocalStorage from '../utils/localStorage';

const ROLE_PRODUCTS = 'customer_products__element-navbar-';

function NavBar({ userInfos }) {
  const [notLogged, setNotLogged] = useState();
  const history = useHistory();

  useEffect(() => {
    const isTokenEmpty = getFromLocalStorage('user', 'token');
    if (isTokenEmpty === '') setNotLogged(true);
    else setNotLogged(false);
  }, []);

  const changeURL = (route) => {
    history.push(route);
  };

  const logOut = () => {
    localStorage.clear();
    changeURL('/');
  };

  const handleHPBtn = () => {
    const { pathname } = history.location;
    if (pathname !== '/customer/homepage') changeURL('/customer/homepage');
    window.location.reload();
  };

  return (
    <ul className="navBar">
      <li>
        <button
          type="button"
          data-testid={ `${ROLE_PRODUCTS}link-products` }
          onClick={
            notLogged ? history.push('/') : () => changeURL('/customer/products')
          }
        >
          PRODUTOS
        </button>
      </li>
      <li>
        <button
          type="button"
          data-testid={ `${ROLE_PRODUCTS}link-orders` }
          onClick={ notLogged ? history.push('/') : () => changeURL('/customer/orders') }
        >
          MEUS PEDIDOS
        </button>
      </li>
      <li>
        <button
          type="button"
          data-testid={ `${ROLE_PRODUCTS}user-full-name` }
          onClick={ notLogged ? history.push('/') : () => handleHPBtn() }
        >
          { userInfos.name }
        </button>
      </li>
      <li>
        <button
          type="button"
          data-testid={ `${ROLE_PRODUCTS}link-logout` }
          onClick={ notLogged ? history.push('/') : () => logOut() }
        >
          Sair
        </button>
      </li>
    </ul>
  );
}

NavBar.propTypes = {
  userInfos: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavBar;
