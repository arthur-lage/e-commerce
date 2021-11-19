import React from "react";

import "../styles/product.css";

function Product({ product }) {
  return (
    <div className="product">
      <img className="productImage" src={product.image} alt={product.name} />
      <div className="productInfo">
        <div className="nameAndPrice">
          <h2 className="productName">{product.name}</h2>
          <strong className="productPrice">
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </strong>
        </div>
        <p className="productDescription">{product.description}</p>
      </div>
    </div>
  );
}

export default Product;
