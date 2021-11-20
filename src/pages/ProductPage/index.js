import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

import api from "../../services/api";

import "../../styles/product-page.css";

function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const productID = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await api.getByID(productID);
      console.log(response.data);
      setProductInfo(response.data);
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleCart = () => {
    // add to cart
  };

  const handleBuy = () => {
    // check if is logged in
    // navigate('/buy/' + productID)
  };

  return (
    <div className="productPage">
      <Header />
      <main>
        Product Page
        <div>
          <img width="150" src={productInfo.image} alt={productInfo.name} />
          <p>{productInfo.name}</p>
          <p>{productInfo.price}</p>
          <p>{productInfo.description}</p>
        </div>
        <button onClick={handleBuy} className="buyButton">
          Buy
        </button>
        <button onClick={handleCart} className="cartButton">
          Add to cart
        </button>
      </main>
    </div>
  );
}

export default ProductPage;
