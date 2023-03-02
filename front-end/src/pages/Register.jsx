import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const registerTestId = 'common_register__';

export default function Register() {
  const history = useHistory();
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [registerResponse, setRegisterResponse] = useState(true);
  const [isRegisterAvailable, setRegisterAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}/;
    const nameRegex = /^.{12,}/;

    const canRegister = nameRegex.test(nameValue)
    && emailRegex.test(emailValue)
    && passwordRegex.test(passwordValue);

    if (canRegister) {
      setRegisterAvailable(true);
    } else {
      setRegisterAvailable(false);
    }
  }, [nameValue, emailValue, passwordValue]);

  const register = async () => {
    const body = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };

    const headers = { 'Content-Type': 'application/json' };

    try {
      await axios({
        method: 'post',
        url: 'http://localhost:3001/register',
        data: body,
        headers,
      });

      history.push('/customer/products');
    } catch (e) {
      setErrorMessage(e.message);
      setRegisterResponse(false);
    }
  };

  return (
    <div className="register">
      <form>
        Nome
        <input
          type="name"
          value={ nameValue }
          onChange={ (e) => setNameValue(e.target.value) }
          data-testid={ `${registerTestId}input-name` }
        />
        Email
        <input
          type="email"
          value={ emailValue }
          onChange={ (e) => setEmailValue(e.target.value) }
          data-testid={ `${registerTestId}input-email` }
        />
        Senha
        <input
          type="password"
          value={ passwordValue }
          onChange={ (e) => setPasswordValue(e.target.value) }
          data-testid={ `${registerTestId}input-password` }
        />
        <button
          type="button"
          onClick={ () => register() }
          data-testid={ `${registerTestId}button-register` }
          disabled={ !isRegisterAvailable }
        >
          CADASTRAR
        </button>
      </form>
      {
        !registerResponse && (
          <text
            data-testid={ `${registerTestId}element-invalid_register` }
          >
            {errorMessage}
          </text>
        )
      }
    </div>
  );
}
