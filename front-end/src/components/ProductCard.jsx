import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_PRODUCT = 'customer_products__';

function ProductCard({ product }) {
  const { id, name, price, urlImage } = product;

  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleInput = ({ target: { value } }) => {
    if (value >= 0) setQuantity(Math.floor(Number(value)));
  };

  const handleRmBtn = (actualProduct) => {
    const item = cartItems.find((e) => e.id === actualProduct.id);

    if (item) {
      // Se o produto já existe no carrinho mas a quantidade é 0,
      // ao tentar subtrair remove ele da lista "cartItems"
      switch (item.quantity) {
      case 0:
        setCartItems(cartItems.filter((e) => e.id !== actualProduct.id));
        break;
        // Ao clicar no botão, atualiza a quantidade subtraindo 1
      default:
        setCartItems(cartItems.map((e) => {
          if (e.id === actualProduct.id) { return { ...e, quantity: e.quantity - 1 }; }
          return item;
        }));
        break;
      }
    }
  };

  const handleAddBtn = (actualProduct) => {
    const item = cartItems.find((e) => e.id === actualProduct.id);

    if (item) {
      // Se o produto já existe no carrinho, atualiza a quantidade
      setCartItems(cartItems.map((e) => {
        if (e.id === actualProduct.id) { return { ...e, quantity: e.quantity + 1 }; }
        return item;
      }));
    } else {
      // Se o produto ainda não está no carrinho, adiciona um novo item
      setCartItems([...cartItems, { ...actualProduct, quantity: 1 }]);
    }
  };

  return (
    <li className="productCard">
      <p
        data-testid={ `${CUSTOMER_PRODUCT}element-card-price-${id}` }
      >
        { `${price.toString().replace('.', ',')}` }
      </p>
      <img
        width={ 100 }
        height={ 100 }
        data-testid={ `${CUSTOMER_PRODUCT}img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <p
        data-testid={ `${CUSTOMER_PRODUCT}element-card-title-${id}` }
      >
        { name }
      </p>
      <button
        data-testid={ `${CUSTOMER_PRODUCT}button-card-rm-item-${id}` }
        type="button"
        onClick={ () => handleRmBtn(product) }
      >
        -
      </button>
      <input
        data-testid={ `${CUSTOMER_PRODUCT}input-card-quantity-${id}` }
        value={ quantity }
        onChange={ handleInput }
      />
      <button
        data-testid={ `${CUSTOMER_PRODUCT}button-card-add-item-${id}` }
        type="button"
        onClick={ () => handleAddBtn(product) }
      >
        +
      </button>
    </li>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
