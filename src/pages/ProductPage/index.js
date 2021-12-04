import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Star from "../../components/Star";

import toast, { Toaster } from 'react-hot-toast'

import ReactLoading from "react-loading";

import ProductComment from "../../components/ProductComment";

import api from "../../services/api";

import "../../styles/product-page.css";

function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false)

  const productID = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await api.getByID(productID);
      setProductInfo(response.data);
      setLoading(false);
    }

    async function updateRating() {
      await api.calculateRating(productID);
    }

    updateRating();
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleCart = () => {
    if(isLogged){
      return
    } else {
      const cartList = JSON.parse(localStorage.getItem("e-shop:cart"))

      cartList.push({id: productID})

      localStorage.setItem("e-shop:cart", JSON.stringify(cartList))

      toast.success("Produto adicionado ao carrinho", {
        style: {
          fontSize: "1.6rem",
          fontFamily: "Poppins, sans-serif"
        }
      })
    }
  };

  const handleBuy = () => {
    navigate('/buy/' + productID)
  };

  return (
    <div className="productPage">
      <Toaster/>
      <Header />
      {loading ? (
        <div className="loadingIcon">
          <ReactLoading
            type="spinningBubbles"
            color="#000"
            width="5%"
            height="5%"
          />
        </div>
      ) : (
        <main>
          <section className="productSection">
            <div className="left">
              <img src={productInfo.image} alt={productInfo.name} />
            </div>
            <div className="right">
              <div className="productInfo">
                <h2>{productInfo.name}</h2>
                <div className="rating">
                  {productInfo.rating
                    ? productInfo.rating.map((star, key) => (
                        <Star key={key} star={star} />
                      ))
                    : ""}
                  <div className="ratingGrade">
                    <span>
                      {Number.isInteger(productInfo.ratingGrade)
                        ? productInfo.ratingGrade + ".0"
                        : productInfo.ratingGrade.toFixed(1)}
                    </span>
                  </div>
                </div>
                <h3>
                  Price:{" "}
                  {productInfo.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h3>
                <h4>
                  10x of{" "}
                  {(productInfo.price / 10).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h4>
              </div>
              <div className="actions">
                <button onClick={handleBuy} className="action buyButton">
                  <i className="fas fa-shopping-bag"></i>
                  Buy
                </button>
                <button onClick={handleCart} className="action cartButton">
                  <i className="fas fa-shopping-cart"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </section>

          <div className="divisor"></div>

          <section className="productDescription">
            <h2>Description</h2>
            <p>{productInfo.description}</p>
          </section>

          <div className="divisor"></div>

          <section className="productComments">
            <h2 className="commentsTitle">Comments</h2>
            {productInfo.comments.map((comment, key) => (
              <ProductComment key={key} commentContent={comment} />
            ))}
          </section>
        </main>
      )}
    </div>
  );
}

export default ProductPage;
