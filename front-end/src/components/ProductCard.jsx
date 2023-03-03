import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_PRODUCT = 'customer_products__';

function ProductCard({ product }) {
  const { id, name, price, urlImage } = product;

  const [itemAmount, setItemAmount] = useState(0);

  const handleInput = ({ target: { value } }) => {
    if (value >= 0) setItemAmount(value);
  };

  return (
    <li className="productCard">
      <p
        data-testid={ `${CUSTOMER_PRODUCT}element-card-price-${id}` }
        value={ `R$ ${price}` }
      />
      <img
        data-testid={ `${CUSTOMER_PRODUCT}img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <p
        data-testid={ `${CUSTOMER_PRODUCT}element-card-title-${id}` }
        value={ name }
      />
      <button
        data-testid={ `${CUSTOMER_PRODUCT}button-card-rm-item-${id}` }
        type="button"
        onClick={ () => setItemAmount(itemAmount > 0 ? itemAmount - 1 : 0) }
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
        onClick={ () => setItemAmount(itemAmount + 1) }
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
