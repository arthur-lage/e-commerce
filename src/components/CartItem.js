import React from "react";

import "../styles/cart-item.css";

import Star from "../components/Star";

function CartItem({ itemInfo }) {
  return (
    <div className="cartItem">
      <div className="image">
        <img src={itemInfo.image} alt={itemInfo.name} />
      </div>
      <div className="info">
        <div className="nameAndPrice">
          <h2>{itemInfo.name}</h2>
          <div className="productPrice">
            <strong className="productPrice">
              {itemInfo.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </strong>
            <h4>
              10x of{" "}
              {(itemInfo.price / 10).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h4>
          </div>
        </div>
        <div className="rating">
          {itemInfo.rating
            ? itemInfo.rating.map((star, key) => <Star key={key} star={star} />)
            : ""}
          <div className="ratingGrade">
            <span>
              {Number.isInteger(itemInfo.ratingGrade)
                ? itemInfo.ratingGrade + ".0"
                : itemInfo.ratingGrade.toFixed(1)}
            </span>
          </div>
        </div>
        <button>Buy</button>
        <button>Remove from Cart</button>
      </div>
    </div>
  );
}

export default CartItem;
