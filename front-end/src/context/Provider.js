import { useMemo, useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';
import getFromLocalStorage from '../utils/localStorage';

function Provider({ children }) {
  const [token, setToken] = useState(getFromLocalStorage('token'));
  const [userName, setUserName] = useState(getFromLocalStorage('user', 'name'));
  const [userRole, setUserRole] = useState(getFromLocalStorage('user', 'role'));

  const contextValue = useMemo(() => (
    {
      userName,
      setUserName,
      userRole,
      setUserRole,
      token,
      setToken,
    }
  ), [
    userName,
    setUserName,
    userRole,
    setUserRole,
    token,
    setToken,
  ]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.defaultProps = { children: {} };
Provider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.array,
    propTypes.object,
  ]),
};

export default Provider;
