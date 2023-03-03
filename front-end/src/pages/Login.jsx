import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const loginTestId = 'common_login__';
const CUSTOMER = 'customer';

export default function Login() {
  const history = useHistory();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loginResponse, setLoginResponse] = useState(true);
  const [loginAvailable, setLoginAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      // user = { name, email, role}
      const { data: { user, token } } = response;

      if (user.role === CUSTOMER) {
        const dataToSave = {
          token,
          ...user,
        };

        localStorage.setItem('user', JSON.stringify(dataToSave));
        history.push('/customer/products');
      }
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
