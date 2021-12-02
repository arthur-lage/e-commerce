import React from "react";

import "../styles/cart-item.css";

import Star from "../components/Star";
import { useNavigate } from "react-router";

function CartItem({ itemInfo }) {
  const navigate = useNavigate()

  const handleBuy = () => {
    navigate("/buy/" + itemInfo._id)
  }

  const handleRemoveFromCart = () => {
    let newCartItemsArray = JSON.parse(localStorage.getItem("e-shop:cart"))
    newCartItemsArray = newCartItemsArray.filter(product => product.id !== itemInfo._id)

    localStorage.setItem("e-shop:cart", JSON.stringify(newCartItemsArray))

    navigate(0)
  }

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
        <button onClick={handleBuy}>Buy</button>
        <button onClick={handleRemoveFromCart} >Remove from Cart</button>
      </div>
    </div>
  );
}

export default CartItem;
