import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../utils/api';

const loginTestId = 'common_login__';

export default function Login() {
  const history = useHistory();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loginResponse, setLoginResponse] = useState(true);
  const [isLoginAvailable, setLoginAvailable] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^\w{6,}/;

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

    try {
      await api.post('/login', body);
    } catch (e) {
      setLoginResponse(false);
    }
  };

  const redirect = () => {
    history.push('/register');
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
          type="submit"
          onClick={ () => login() }
          data-testid={ `${loginTestId}button-login` }
          disabled={ !isLoginAvailable }
        >
          LOGIN
        </button>
        <button
          type="button"
          onClick={ () => redirect() }
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
            Elemento oculto (Mensagens de erro)
          </text>
        )
      }
    </div>
  );
}
