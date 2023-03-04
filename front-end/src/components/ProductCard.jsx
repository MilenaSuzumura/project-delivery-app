import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_PRODUCT = 'customer_products__';

function ProductCard({ product }) {
  const { id, name, price, urlImage } = product;

  const [itemAmount, setItemAmount] = useState(0);
  const [carItems] = useState([]);

  // did mount
  // useEffect(() => {
  //   const newCarItems = carItems.push({ ...product, itemAmount: 0 });
  //   setCarItems(newCarItems);

  //   localStorage.setItem('carItems', JSON.stringify(carItems));
  // }, [product, carItems]);

  // did update
  useEffect(() => {
    if (!carItems.length) {
      console.log('Array Vazio Fi');
    } else {
      console.log('Dentro do else');
      const itemToUpdate = carItems.find((obj) => obj.name === name);

      itemToUpdate.itemAmount = itemAmount;
    }

    // localStorage.setItem('carItems', JSON.stringify(carItems));

    // window.dispatchEvent(new Event('storage'));
  }, [itemAmount, name, carItems]);

  const handleInput = ({ target: { value } }) => {
    if (value >= 0) setItemAmount(Math.floor(Number(value)));
  };

  const handleRmInput = () => {
    setItemAmount(itemAmount > 0 ? itemAmount - 1 : 0);
  };

  const handleAddInput = () => {
    setItemAmount(Number(itemAmount + 1));
  };

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
        onClick={ handleRmInput }
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
        onClick={ handleAddInput }
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
