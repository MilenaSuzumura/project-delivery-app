import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const loginTestId = 'common_login__';
const CUSTOMER = 'customer';
const SELLER = 'seller';
const ADMIN = 'administrator';

export default function Login() {
  const history = useHistory();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loginResponse, setLoginResponse] = useState(true);
  const [loginAvailable, setLoginAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const { role } = user;
      switch (role) {
      case ADMIN:
        history.push('/ADMIN');
        break;
      case SELLER:
        history.push(`${SELLER}/orders`);
        break;
      default:
        history.push(`${CUSTOMER}/products`);
        break;
      }
    }
  }, [history]);

  const redirect = ({ user, token }) => {
    const dataToSave = {
      token,
      ...user,
    };
    localStorage.setItem('user', JSON.stringify(dataToSave));

    if (user.role === SELLER) { return history.push(`${SELLER}/orders`); }
    if (user.role === ADMIN) { return history.push('/admin/manage'); }
    history.push(`${CUSTOMER}/products`);
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6}/;

    if (passwordRegex.test(passwordValue) && emailRegex.test(emailValue)) {
      setLoginAvailable(true);
    } else {
      setLoginAvailable(false);
    }
  }, [emailValue, passwordValue]);

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
      const { data } = response;
      redirect(data);
    } catch (e) {
      setErrorMessage(e.message);
      setLoginResponse(false);
    }
  };

  return (
    <div className="Login">
      <form>
        Login
        <input
          type="email"
          value={ emailValue }
          onChange={ (e) => setEmailValue(e.target.value) }
          data-testid={ `${loginTestId}input-email` }
        />
        Senha
        <input
          type="password"
          value={ passwordValue }
          min="6"
          onChange={ (e) => setPasswordValue(e.target.value) }
          data-testid={ `${loginTestId}input-password` }
        />
        <button
          type="button"
          onClick={ () => login() }
          data-testid={ `${loginTestId}button-login` }
          disabled={ !loginAvailable }
        >
          LOGIN
        </button>
        <button
          type="button"
          onClick={ () => history.push('/register') }
          data-testid={ `${loginTestId}button-register` }
        >
          Ainda não tenho conta
        </button>
      </form>
      {
        !loginResponse && (
          <text
            data-testid={ `${loginTestId}element-invalid-email` }
          >
            {errorMessage}
          </text>
        )
      }
    </div>
  );
}
