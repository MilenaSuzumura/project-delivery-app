import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import getFromLocalStorage from '../utils/localStorage';

import UserTable from '../components/UserTable';

export default function Admin() {
  const name = getFromLocalStorage('user', 'name');

  const NAV_BAR_TEST_ID = 'customer_products__element-';
  const FORM_TEST_ID = 'admin_manage__';

  const [newUserName, setUserName] = useState('');
  const [newUserEmail, setUserEmail] = useState('');
  const [newUserPassword, setUserNPassword] = useState('');
  const [newUserType, setUserType] = useState('');

  const [isValidUser, setIsValidUser] = useState(false);

  const [users, setUsers] = useState([]);

  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setUsers([
      {
        name: 'nome1',
        email: 'email1',
        role: 'seller',
      },
      {
        name: 'nome2',
        email: 'email2',
        role: 'Cliente',
      },
    ]);
  }, []);

  useEffect(() => {
    const nameRegex = /^.{12}/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6}/;

    if (
      nameRegex.test(newUserName)
      && emailRegex.test(newUserEmail)
      && passwordRegex.test(newUserPassword)) setIsValidUser(true);
    else setIsValidUser(false);
  }, [newUserEmail, newUserName, newUserPassword]);

  const changeInputValue = (e) => {
    switch (e.target.id) {
    case 'name':
      setUserName(e.target.value);
      break;
    case 'email':
      setUserEmail(e.target.value);
      break;
    case 'password':
      setUserNPassword(e.target.value);
      break;
    case 'role':
      setUserType(e.target.value);
      break;
    default:
      throw new Error('not found');
    }
  };

  return (
    <div className="admin">
      <nav className="nav-bar">
        <div
          data-testid={ `${NAV_BAR_TEST_ID}navbar-link-orders` }
        >
          GERENCIAR USUÁRIOS
        </div>
        <div
          data-testid={ `${NAV_BAR_TEST_ID}navbar-user-full-name` }
        >
          { name }
        </div>
        <button
          type="button"
          onClick={ () => logOut() }
          data-testid={ `${NAV_BAR_TEST_ID}navbar-link-logout` }
        >
          Sair
        </button>
      </nav>
      <form>
        <p>
          Cadastrar novo usuário
        </p>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            value={ newUserName }
            onChange={ (e) => changeInputValue(e) }
            data-testid={ `${FORM_TEST_ID}input-name` }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={ newUserEmail }
            onChange={ (e) => changeInputValue(e) }
            data-testid={ `${FORM_TEST_ID}input-email` }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            value={ newUserPassword }
            onChange={ (e) => changeInputValue(e) }
            data-testid={ `${FORM_TEST_ID}input-password` }
          />
        </label>
        <label htmlFor="seller">
          Tipo
          <select
            id="role"
            onChange={ (e) => changeInputValue(e) }
            data-testid={ `${FORM_TEST_ID}select-role` }
            value={ newUserType }
          >
            <option
              id="role"
              value="seller"
            >
              Vendedor
            </option>
            <option
              id="role"
              value="client"
            >
              Cliente
            </option>
          </select>
          <button
            type="button"
            onClick={ () => console.log('a') }
            disabled={ !isValidUser }
            data-testid={ `${FORM_TEST_ID}button-register` }
          >
            CADASTRAR
          </button>
        </label>
      </form>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((user, i) => (
              <UserTable user={ user } index={ i } key={ i } />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
