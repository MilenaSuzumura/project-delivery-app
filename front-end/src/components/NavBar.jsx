import React from "react";

const roleProducts = "customer_products";

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
        <a
          data-testid={ `${roleProducts}__element-navbar-link-products` }
          onClick={ () => changeURL("/customer/products") }
        >
          PRODUTOS
        </a>
      </li>
      <li>
        <a
          data-testid={ `${roleProducts}__element-navbar-link-orders` }
          onClick={ () => changeURL("/customer/orders") }
        >
          MEUS PEDIDOS
        </a>
      </li>
      <li>
        <a
          data-testid={ `${roleProducts}__element-navbar-user-full-name` }
        >
          { userInfos.name }
        </a>
      </li>
      <li>
        <a
          data-testid={ `${roleProducts}__element-navbar-link-logout` }
          onClick={ () => logOut() }
        >
          Sair
        </a>
      </li>
    </ul>
  );
}
export default NavBar;