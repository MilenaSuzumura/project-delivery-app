import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_PRODUCT = 'customer_products__';

function ProductCard({ product }) {
  const { id, name, price, urlImage } = product;

  const [quantity, setQuantity] = useState(0);

  const handleInput = ({ target: { value } }) => {
    if (value >= 0) setQuantity(Math.floor(Number(value)));
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const itemToUpdate = cartItems.find((obj) => obj.name === name);

    if (quantity > 0) {
      if (itemToUpdate) itemToUpdate.quantity = quantity;
      else cartItems.push({ ...product, quantity });

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('storage'));
    } else if (itemToUpdate) {
      const itemId = cartItems.findIndex((item) => item.name === product.name);

      cartItems.splice(itemId, 1);

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('storage'));
    }
  }, [quantity, name, product]);

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
        onClick={ () => setQuantity(quantity > 0 ? Number(quantity - 1) : 0) }
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
        onClick={ () => setQuantity(Number(quantity + 1)) }
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
