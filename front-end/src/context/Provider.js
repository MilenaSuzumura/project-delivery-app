import { useMemo, useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';
import { getName } from '../utils/localStorage';

function Provider({ children }) {
  const [userName, setUserName] = useState(getName('user'));

  const contextValue = useMemo(() => (
    // { email, setEmail }
    { userName, setUserName }
    // [email, setEmail]
  ), [userName, setUserName]);

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
