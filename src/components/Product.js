import React from "react";

import "../styles/product.css";

import Star from "../components/Star";

function Product({ product }) {
  return (
    <div className="product">
      <img className="productImage" src={product.image} alt={product.name} />
      <div className="productInfo">
        <div className="nameAndPrice">
          <h2 className="productName">{product.name}</h2>
          <div className="productPrice">
            <strong className="productPrice">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </strong>
            <h4>
              10x of{" "}
              {(product.price / 10).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h4>
          </div>
        </div>
        <div className="rating">
          {product.rating
            ? product.rating.map((star, key) => <Star key={key} star={star} />)
            : ""}
          <div className="ratingGrade">
            <span>
              {Number.isInteger(product.ratingGrade)
                ? product.ratingGrade + ".0"
                : product.ratingGrade.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
