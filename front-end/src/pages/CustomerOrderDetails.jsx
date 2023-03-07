import axios from 'axios';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import getFromLocalStorage from '../utils/localStorage';

const DETAILS = 'customer_order_details__';
const ELEMENT = 'element-order-';

function CustomerOrderDetails({ match }) {
  const { id } = match.params;

  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');
  const token = getFromLocalStorage('user', 'token');

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getFetch = async () => {
      const headers = { 'Content-Type': 'application/json', authorization: token };

      try {
        const data = await axios({
          method: 'get',
          url: `http://localhost:3001/customer/orders/${id}`,
          data: {},
          headers,
        });
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    getFetch();
  }, [id, token]);

  console.log(orders);

  const handleBtn = () => {
    console.log('SENDO CLICADO');
  };

  return (
    <div>
      <NavBar userInfos={ { name, role } } />
      <div>
        Detalhe do Pedido
        <div>
          <p data-testid={ `${DETAILS}${ELEMENT}details-label-order-id` }>
            { `Pedido ${id}` }
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}details-label-seller-name` }>
            {/* { `P. Vend: ${sellerName}` } */}
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}details-label-order-date` }>
            {/* { date } */}
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}details-label-delivery-status<index>` }>
            {/* { status } */}
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}table-item-number-<index>` }>
            {/* { itemNumber } */}
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}table-name-<index>` }>
            {/* { itemName } */}
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}table-quantity-<index>` }>
            {/* { quantity } */}
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}table-unit-price-<index>` }>
            {/* { unitPrice } */}
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}table-sub-total-<index>` }>
            {/* { subTotal } */}
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}total-price` }>
            {/* { totalPrice } */}
          </p>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            onClick={ () => handleBtn }
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      </div>
    </div>
  );
}

CustomerOrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrderDetails;
