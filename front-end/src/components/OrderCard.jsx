import React from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_TEST_ID = 'customer_checkout__element-order-table-';

function OrderCard({ cartItem, id }) {
  const { name, quantity, price } = cartItem;
  const total = price * quantity;

  const removeItem = () => {
    const items = JSON.parse(localStorage.getItem('cartItems'));

    items.splice(id - 1, 1);
    localStorage.setItem('cartItems', JSON.stringify(items));

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <tr>
      <td
        data-testid={ `${CUSTOMER_TEST_ID}item-number-${id}` }
      >
        { id }
      </td>
      <td
        data-testid={ `${CUSTOMER_TEST_ID}name-${id}` }
      >
        { name }
      </td>
      <td
        data-testid={ `${CUSTOMER_TEST_ID}quantity-${id}` }
      >
        { quantity }
      </td>
      <td
        data-testid={ `${CUSTOMER_TEST_ID}unit-price-${id}` }
      >
        { `R$ ${price.toString().replace('.', ',')}` }
      </td>
      <td
        data-testid={ `${CUSTOMER_TEST_ID}sub-total-${id}` }
      >
        { `R$ ${total.toFixed(2).toString().replace('.', ',')}` }
      </td>
      <td
        data-testid={ `${CUSTOMER_TEST_ID}remove-${id}` }
      >
        <button
          type="button"
          onClick={ () => removeItem() }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

OrderCard.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
};

export default OrderCard;
