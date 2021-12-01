import React, { useState, useEffect } from "react";

import "../../styles/cart-page.css";

import Header from '../../components/Header'
import CartItem from "../../components/CartItem";

import api from "../../services/api";

function CartPage() {
  const [cartItemsList, setCartItemsList] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("e-shop:cart")) === []) {
      setCartItemsList([]);
    } else {
      const idArray = JSON.parse(localStorage.getItem("e-shop:cart"));

      async function getCartItems(id) {
        const newProduct = await api.getByID(id);

        setCartItemsList([...cartItemsList, newProduct.data]);
      }

      idArray.forEach((id) => {
        getCartItems(id);
      });
    }
  }, []);

  return (
    <div className="cartPage">
      <Header />

      <h1 className="title">Shopping Cart</h1>

      {cartItemsList.length > 0 ? (
        <div className="cartItems">
          {cartItemsList.map((itemInfo, key) => (
            <CartItem itemInfo={itemInfo} key={key} />
          ))}
        </div>
      ) : (
        <h2>Your Shopping Cart is empty</h2>
      )}
    </div>
  );
}

export default CartPage;
