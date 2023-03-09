import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

import getFromLocalStorage from '../utils/localStorage';
import { DAY_BEGGINING,
  DAY_ENDING,
  MONTH_BEGGINING,
  MONTH_ENDING,
  YEAR_BEGGINING,
  YEAR_ENDING } from '../utils/numbers';

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

const headers = { 'Content-Type': 'application/json' };

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
  const [status, setStatus] = useState('');
  const [indexForStatusDTI, setIndexForStatusDTI] = useState(0);

  const createDate = (saleDate = undefined) => {
    if (saleDate) {
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
    const getDetailsFetch = async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: `http://localhost:3001/customer/orders/${id}`,
          data: {},
          headers,
        });

        setDetails(data);

        setSeller(data.seller);
        modifyProducts(data.products);
        setTotalPrice(data.totalPrice);
        createDate(data.saleDate);
        setStatus(data.status);
      } catch (error) {
        console.log(error);
      }
    };

    getDetailsFetch();
  }, [id, token]);

  useEffect(() => {
    const getOrdersFetch = async () => {
      const body = { userId: 3 };

      try {
        const { data } = await axios({
          method: 'post',
          url: 'http://localhost:3001/customer/orders',
          data: body,
          headers,
        });

        const statusIndex = data
          .findIndex((order) => order.saleDate === details.saleDate);

        setIndexForStatusDTI(statusIndex);
      } catch (error) {
        console.log(error);
      }
    };

    getOrdersFetch();
  }, [details.saleDate]);

  const handleBtn = async () => {
    const body = { algoId: 0 };

    try {
      await axios({
        method: 'patch',
        url: 'http://localhost:3001/customer/orders',
        data: body,
        headers,
      });

      setStatus('Entregue');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar userInfos={ { name, role } } />
      <h2>Detalhe do Pedido</h2>
      <h4 data-testid={ `${DETAILS}${ELEMENT}details-label-order-id` }>
        { `Pedido ${id}` }
      </h4>
      <h4 data-testid={ `${DETAILS}${ELEMENT}details-label-seller-name` }>
        { `P. Vend: ${seller.name}` }
      </h4>
      <h4 data-testid={ `${DETAILS}${ELEMENT}details-label-order-date` }>
        { date }
      </h4>
      <h3 data-testid={ `${DETAILS}${ELEMENT}${LABEL_STATUS}-${indexForStatusDTI}` }>
        { status }
      </h3>
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
      <p>Total: R$ </p>
      <p data-testid={ `${DETAILS}${ELEMENT}total-price` }>
        { `${totalPrice.toString().replace('.', ',')}`}
      </p>
      <button
        data-testid={ `${DETAILS}button-delivery-check` }
        type="button"
        onClick={ () => handleBtn() }
        disabled
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
