import PropTypes from 'prop-types';
import { ONE_DIGIT, TWO_DIGITS, THREE_DIGITS,
  zero, two, four, six, eight } from '../utils/numbers';

function OrderStatusCard({ orderInfo }) {
  const { id, status, price, date } = orderInfo;

  const DAY = date.substring(zero, two);
  const MONTH = date.substring(two, four);
  const YEAR = date.substring(six, eight);

  const ORDER_ELEMENT = 'customer_orders__element-';

  const cardGenerator = () => {
    switch (JSON.stringify(id).length) {
    case ONE_DIGIT:
      return (
        <p data-testid={ `${ORDER_ELEMENT}order-id-${id}` }>
          000
          {id}
        </p>
      );
    case TWO_DIGITS:
      return (
        <p data-testid={ `${ORDER_ELEMENT}order-id-${id}` }>
          00
          {id}
        </p>
      );
    case THREE_DIGITS:
      return (
        <p data-testid={ `${ORDER_ELEMENT}order-id-${id}` }>
          0
          {id}
        </p>
      );
    default:
      return <p>{ id }</p>;
    }
  };

  return (
    <div>
      { cardGenerator() }
      <p data-testid={ `${ORDER_ELEMENT}delivery-status-${id}` }>{ status }</p>
      <p
        data-testid={ `${ORDER_ELEMENT}order-date-${id}` }
      >
        { `${DAY}/${MONTH}/${YEAR}` }
      </p>
      <p data-testid={ `${ORDER_ELEMENT}card-price-${id}` }>{ price }</p>
    </div>
  );
}

OrderStatusCard.propTypes = {
  orderInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderStatusCard;
