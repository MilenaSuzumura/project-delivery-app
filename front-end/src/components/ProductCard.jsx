import React, { useEffect, useState } from 'react';

function ProductCard({ product }) {
  const { name, urlImg, price } = product;
  return (
    <div className="productCard">
      <p>
        A
      </p>
      <img  src={ urlImg } alt="card-image" />
    </div>
  );
}
export default ProductCard;
