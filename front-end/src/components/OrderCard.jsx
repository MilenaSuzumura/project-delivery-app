import React from 'react';

function OrderCard({ carItem }) {
  console.log(carItem);

  return (
    <div>
      Order Card
    </div>
  );
}

OrderCard.propTypes = {
  carItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    itemAmount: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderCard;
