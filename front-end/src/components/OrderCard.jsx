import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({ cartItem }) {
  console.log(cartItem);

  return (
    <div>
      Order Card
    </div>
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
};

export default OrderCard;
