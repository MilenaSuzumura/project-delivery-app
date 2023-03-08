import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

import getFromLocalStorage from '../utils/localStorage';

const DETAILS = 'customer_order_details__';
const ELEMENT = 'element-order-';
const LABEL_STATUS = 'details-label-delivery-status';

const DTI_ARR = [
  `${DETAILS}${ELEMENT}table-item-number-`,
  `${DETAILS}${ELEMENT}table-name-`,
  `${DETAILS}${ELEMENT}table-quantity-`,
  `${DETAILS}${ELEMENT}table-unit-price-`,
  `${DETAILS}${ELEMENT}table-sub-total-`,
];

const data = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '25.50',
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
    {
      id: 1,
      name: 'Cerveja Stella 250ml',
      price: '3.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SaleProduct: {
        saleId: 1,
        productId: 2,
        quantity: 3,
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

function CustomerOrderDetails({ match }) {
  const { id } = match.params;

  const name = getFromLocalStorage('user', 'name');
  const role = getFromLocalStorage('user', 'role');
  const token = getFromLocalStorage('user', 'token');

  const [details, setDetails] = useState({});
  const [seller, setSeller] = useState({});
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const createDate = (saleDate = undefined) => {
    if (saleDate) {
      const DAY_BEGGINING = 8;
      const DAY_ENDING = 10;

      const MONTH_BEGGINING = 5;
      const MONTH_ENDING = 7;

      const YEAR_BEGGINING = 2;
      const YEAR_ENDING = 4;

      const DAY = saleDate.substring(DAY_BEGGINING, DAY_ENDING);
      const MONTH = saleDate.substring(MONTH_BEGGINING, MONTH_ENDING);
      const YEAR = saleDate.substring(YEAR_BEGGINING, YEAR_ENDING);

      setDate(`${DAY}/${MONTH}/${YEAR}`);
    }
  };

  const modifyProducts = (productsArr = undefined) => {
    if (productsArr) {
      const productsWithQuantities = productsArr.reduce((acc, crr) => {
        const obj = { ...crr, quantity: crr.SaleProduct.quantity };
        acc.push(obj);
        return acc;
      }, []);

      setProducts(productsWithQuantities);
    }
  };

  useEffect(() => {
    const getFetch = async () => {
      const headers = { 'Content-Type': 'application/json' };

      try {
        let response = await axios({
          method: 'get',
          url: `http://localhost:3001/customer/orders/${id}`,
          data: {},
          headers,
        });
        response = data;

        setDetails(response);
        setSeller(response.seller);
        modifyProducts(response.products);
        setTotalPrice(response.totalPrice);
        createDate(response.saleDate);
      } catch (error) {
        console.log(error);
      }
    };

    getFetch();
  }, [id, token]);

  const handleBtn = () => {
    console.log('SENDO CLICADO');
  };

  const { status } = details;

  return (
    <div>
      <NavBar userInfos={ { name, role } } />
      <h1>DETALHE DO PEDIDO</h1>
      <p data-testid={ `${DETAILS}${ELEMENT}details-label-order-id` }>
        { `Pedido ${id}` }
      </p>
      <p data-testid={ `${DETAILS}${ELEMENT}details-label-seller-name` }>
        { `P. Vend: ${seller.name}` }
      </p>
      <p data-testid={ `${DETAILS}${ELEMENT}details-label-order-date` }>
        { date }
      </p>
      <p data-testid={ `${DETAILS}${ELEMENT}${LABEL_STATUS}-<INDEX>` }>
        { status }
      </p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { products.map((product, index) => (
            <OrderCard
              key={ index }
              dataItem={ product }
              index={ index }
              testIds={ DTI_ARR }
            />
          ))}
        </tbody>
      </table>
      <p>{ `Total: R$ ${totalPrice}`}</p>
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

CustomerOrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrderDetails;
