import React from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_TEST_ID = 'customer_checkout__element-order-table-';

function OrderCard({ dataItem, index, rmBtn, testIds }) {
  const [dtiItem, dtiName, dtiQnt, dtiUP, dtiST] = testIds;

  const { name, quantity, price } = dataItem;
  const subTotal = price * quantity;

  const removeItem = () => {
    const items = JSON.parse(localStorage.getItem('cartItems'));

    items.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(items));

    window.dispatchEvent(new Event('storage_checkout'));
  };

  return (
    <tr>
      <td data-testid={ `${dtiItem}${index}` }>
        { index + 1 }
      </td>
      <td data-testid={ `${dtiName}${index}` }>
        { name }
      </td>
      <td data-testid={ `${dtiQnt}${index}` }>
        { quantity }
      </td>
      <td data-testid={ `${dtiUP}${index}` }>
        { `R$ ${price.toString().replace('.', ',')}` }
      </td>
      <td data-testid={ `${dtiST}${index}` }>
        { `R$ ${subTotal.toFixed(2).toString().replace('.', ',')}` }
      </td>
      {rmBtn && (
        <td data-testid={ `${CUSTOMER_TEST_ID}remove-${index}` }>
          <button type="button" onClick={ () => removeItem() }>
            Remover
          </button>
        </td>)}
    </tr>
  );
}

OrderCard.defaultProps = {
  rmBtn: false,
};

OrderCard.propTypes = {
  dataItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  rmBtn: PropTypes.bool,
  testIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default OrderCard;
