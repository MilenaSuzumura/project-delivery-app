// import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import getFromLocalStorage from '../utils/localStorage';

const DETAILS = 'customer_order_details__';
const ELEMENT = 'element-order-';

const fetchSimulator = () => new Promise((resolve) => {
  const TIMEOUT = 1000;
  const data = {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '15.00',
    deliveryAddress: 'rua A',
    deliveryNumber: '2',
    saleDate: '2023-03-06T18:57:49.000Z',
    status: 'Pendente',
    products: [
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
        SaleProduct: {
          saleId: 1,
          productId: 2,
          quantity: 2,
        },
      },
    ],
    seller: {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller',
    },
  };

  setTimeout(() => {
    resolve(data);
  }, TIMEOUT);
});
function CustomerOrderDetails({ match }) {
  const { id } = match.params;

  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');
  // const token = getFromLocalStorage('user', 'token');

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getFetch = async () => {
      try {
        const response = await fetchSimulator();
        setDetails(response);
      } catch (error) {
        console.log(error);
      }
    };

    getFetch();
  }, []);
  // useEffect(() => {
  //   const getFetch = async () => {
  //     const headers = { 'Content-Type': 'application/json', authorization: token };

  //     try {
  //       const data = await axios({
  //         method: 'get',
  //         url: `http://localhost:3001/customer/orders/${id}`,
  //         data: {},
  //         headers,
  //       });
  //       setOrders(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getFetch();
  // }, [id, token]);

  console.log(details);

  const handleBtn = () => {
    console.log('SENDO CLICADO');
  };

  const detailsGenerator = () => {
    if (details.length > 0) {
      return (
        <div>
          <p data-testid={ `${DETAILS}${ELEMENT}details-label-order-id` }>
            { `Pedido ${id}` }
          </p>
          <p data-testid={ `${DETAILS}${ELEMENT}details-label-seller-name` }>
            { `P. Vend: ${details.seller.name}` }
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
      );
    }
  };

  return (
    <div>
      {/* <NavBar userInfos={ { name, role } } /> */}
      <div>
        DETALHE DO PEDIDO
        { detailsGenerator() }
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
