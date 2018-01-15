import React from 'react';

const Card = (props) => {
  const {productInfo} = props
  return (
    <div className="card">
      <div>
        <img src={productInfo.imageUrl} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-name">
          {productInfo.title}
        </div>
        <div className="product-price">
          {productInfo.price} Coins
        </div>
      </div>
    </div>
  )
}

export default Card;
