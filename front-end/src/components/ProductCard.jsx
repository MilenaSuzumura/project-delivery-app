import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getFromLocalStorage from '../utils/localStorage';

const CUSTOMER_PRODUCT = 'customer_products__';

function ProductCard({ product }) {
  const { id, name, price, urlImage } = product;

  const [itemAmount, setItemAmount] = useState(0);
  const [car, setCar] = useState(JSON.parse(localStorage.getItem('cartItems')));

  const handleInput = ({ target: { value } }) => {
    if (value >= 0) setItemAmount(Math.floor(Number(value)));
  };

  const handleRmBtn = () => {
    setItemAmount(itemAmount > 0 ? Number(itemAmount - 1) : 0);
  };

  const handleAddBtn = () => {
    setItemAmount(Number(itemAmount + 1));
    const cartItems = getFromLocalStorage('cartItems');
    // if (car === []) {
    //   car.push({ teste: 'teste' });
    // }
    // console.log(typeof car);
    // console.log(car === []);
    // const teste = ;
    // console.log(teste);
    // console.log(car);
    setCar([...car, { ...product, itemAmount: 0 }]);

    const testFunc = () => cartItems.some((e) => e.name === name);

    if (!testFunc()) {
      console.log('entrando');
      const teste = [...cartItems, ...car];
      console.log(teste);
      localStorage.setItem('cartItems', JSON.stringify(teste));
    }
  };
  useEffect(() => {
    // console.log(car);
  }, [car]);
  // did mount
  // useEffect(() => {
  //   const cartItems = JSON.parse(localStorage.getItem('cartItems'));

  //   cartItems.push({ ...product, itemAmount: 0 });

  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }, [product]);

  // did update
  // useEffect(() => {
  //   const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  //   const itemToUpdate = cartItems.find((obj) => obj.name === name);

  //   itemToUpdate.itemAmount = itemAmount;

  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));

  //   window.dispatchEvent(new Event('storage'));
  // }, [itemAmount, name]);

  return (
    <li className="productCard">
      <p
        data-testid={ `${CUSTOMER_PRODUCT}element-card-price-${id}` }
      >
        { `${price.toString().replace('.', ',')}` }
      </p>
      <img
        width={ 100 }
        height={ 100 }
        data-testid={ `${CUSTOMER_PRODUCT}img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <p
        data-testid={ `${CUSTOMER_PRODUCT}element-card-title-${id}` }
      >
        { name }
      </p>
      <button
        data-testid={ `${CUSTOMER_PRODUCT}button-card-rm-item-${id}` }
        type="button"
        onClick={ handleRmBtn }
      >
        -
      </button>
      <input
        data-testid={ `${CUSTOMER_PRODUCT}input-card-quantity-${id}` }
        value={ itemAmount }
        onChange={ handleInput }
      />
      <button
        data-testid={ `${CUSTOMER_PRODUCT}button-card-add-item-${id}` }
        type="button"
        onClick={ handleAddBtn }
      >
        +
      </button>
    </li>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
