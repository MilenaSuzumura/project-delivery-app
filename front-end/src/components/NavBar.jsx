import React from 'react';

const roleProducts = 'customer_products__element-navbar-';

function NavBar({ userInfos }) {
  const logOut = () => {
    console.log(1);
  };

  const changeURL = (route) => {
    history.push(route);
  }

  return (
    <ul className="navBar">
      <li>
        <button
          data-testid={ `${roleProducts}link-products` }
          onClick={ () => changeURL('/customer/products') }
        >
          PRODUTOS
        </button>
      </li>
      <li>
        <button
          data-testid={ `${roleProducts}link-orders` }
          onClick={ () => changeURL('/customer/orders') }
        >
          MEUS PEDIDOS
        </button>
      </li>
      <li>
        <button
          data-testid={ `${roleProducts}user-full-name` }
        >
          { userInfos.name }
        </button>
      </li>
      <li>
        <button
          data-testid={ `${roleProducts}link-logout` }
          onClick={ () => logOut() }
        >
          Sair
        </button>
      </li>
    </ul>
  );
}
export default NavBar;