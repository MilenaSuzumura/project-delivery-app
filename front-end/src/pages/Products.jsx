import React from 'react';
import NavBar from '../components/NavBar';

const userInfos = {
  name: 'temp',
  role: 'customer',
}

function Products() {
  return (
    <div className="products">
      <NavBar userInfos={ userInfos }/>
    </div>
  );
}
export default Products;
