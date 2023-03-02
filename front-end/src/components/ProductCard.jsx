import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_PRODUCT = 'customer_products__';

function ProductCard({ key, product }) {
  const { id, name, urlImg, price } = product;

  const [itemAmount, setItemAmount] = useState(0);
  const [carItem, setCarItem] = useState({ ...product, itemAmount });

  useEffect(() => {
    setCarItem({
      ...product,
      itemAmount,
    });
  }, [product, itemAmount]);

  return (
    <li className="productCard" key={ key }>
      <p
        data-testid={ `${CUSTOMER_PRODUCT}element-card-price-${id}` }
        value={ `R$ ${price}` }
      />
      <img
        data-testid={ `${CUSTOMER_PRODUCT}img-card-bg-image-${id}` }
        src={ urlImg }
        alt="card"
      />
      <p
        data-testid={ `${CUSTOMER_PRODUCT}element-card-title-${id}` }
        value={ name }
      />
      <button
        data-testid={ `${CUSTOMER_PRODUCT}button-card-rm-item-${id}` }
        type="button"
        onClick={ setItemAmount(itemAmount > 0 ? itemAmount - 1 : 0) }
      >
        -
      </button>
      <input
        data-testid={ `${CUSTOMER_PRODUCT}input-card-quantity-${id}` }
        value={ carItem.itemAmount }
        onChange={ (e) => setItemAmount(e.target.value >= 0 ? e.target.value : 0) }
      />
      <button
        data-testid={ `${CUSTOMER_PRODUCT}button-card-add-item-${id}` }
        type="button"
        onClick={ setItemAmount(itemAmount + 1) }
      >
        +
      </button>
    </li>
  );
}

ProductCard.propTypes = {
  key: PropTypes.string.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImg: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
