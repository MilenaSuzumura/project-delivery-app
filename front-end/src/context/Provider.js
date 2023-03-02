import { useMemo, useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';
import getName from '../utils/localStorage';

function Provider({ children }) {
  const [token, setToken] = useState(getName('token'));
  const [userName, setUserName] = useState(getName('user', 'name'));
  const [userRole, setUserRole] = useState(getName('user', 'role'));

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
