import React, { useState, useEffect } from 'react';

const registerTestId = 'common_register__';

export default function Register() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [registerResponse, setRegisterResponse] = useState(true);
  const [isRegisterAvailable, setRegisterAvailable] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}/;
    const nameRegex = /^.{12,}/;

    const canSignIn = nameRegex.test(nameValue)
    && emailRegex.test(emailValue)
    && passwordRegex.test(passwordValue);

    if (canSignIn) {
      setRegisterAvailable(true);
    } else {
      setRegisterAvailable(false);
    }
  }, [nameValue, emailValue, passwordValue]);

  const register = () => {
    setRegisterResponse(false);
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
          type="submit"
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
            data-testid={ `${registerTestId}element-invalid-email` }
          >
            Elemento oculto (Mensagens de erro)
          </text>
        )
      }
    </div>
  );
}
