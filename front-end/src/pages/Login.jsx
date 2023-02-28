import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const loginTestId = 'common_login__';

export default function Login() {
  const [emailValue, changeEmail] = useState('');
  const [passwordValue, changePassword] = useState('');
  const [loginResponse, changeLoginResponse] = useState(false);

  const login = () => {
    changeLoginResponse(false);
  };

  return (
    <div className="Login">
      <form>
        <input
          type="email"
          value={ emailValue }
          onChange={ (e) => changeEmail(e.target.value) }
          data-testid={ `${loginTestId}input-email` }
        />
        <input
          type="password"
          value={ passwordValue }
          onChange={ (e) => changePassword(e.target.value) }
          data-testid={ `${loginTestId}input-password` }
        />
        <button
          type="submit"
          onClick={ () => login() }
          data-testid={ `${loginTestId}button-login` }
        >
          LOGIN
        </button>
        <button
          type="button"
          onClick={ <Redirect to="/register" /> }
          data-testid={ `${loginTestId}button-register` }
        >
          Ainda não tenho conta
        </button>
      </form>
      {
        loginResponse && (
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
