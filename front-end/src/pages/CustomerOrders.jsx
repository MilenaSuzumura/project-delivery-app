// import React from 'react';

import NavBar from '../components/NavBar';
import getFromLocalStorage from '../utils/localStorage';

function CustomerOrders() {
  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');

  return (
    <div>
      <NavBar userInfos={ { name, role } } />
      <h1>CUSTOMER ORDER</h1>
    </div>
  );
}

export default CustomerOrders;
