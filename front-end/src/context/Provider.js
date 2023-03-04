import { useMemo } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  // const [token, setToken] = useState(getFromLocalStorage('token'));

  const contextValue = useMemo(() => (
    {
    }
  ), [
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
