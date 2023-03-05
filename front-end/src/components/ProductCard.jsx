import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_PRODUCT = 'customer_products__';

function ProductCard({ product, addToCart: handleAddBtn }) {
  const { id, name, price, urlImage } = product;

  const [quantity, setQuantity] = useState(0);

  const handleInput = ({ target: { value } }) => {
    if (value >= 0) setQuantity(Math.floor(Number(value)));
  };

  const handleRmBtn = () => {
    console.log('tentando remover');
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
        onClick={ handleRmBtn }
      >
        -
      </button>
      <input
        data-testid={ `${CUSTOMER_PRODUCT}input-card-quantity-${id}` }
        value={ quantity }
        onChange={ handleInput }
      />
      <button
        data-testid={ `${CUSTOMER_PRODUCT}button-card-add-item-${id}` }
        type="button"
        onClick={ () => handleAddBtn(product) }
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
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
