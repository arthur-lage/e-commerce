import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "../../styles/home.css";
import api from "../../services/api";

import Product from "../../components/Product";
import Header from "../../components/Header";

import ReactLoading from 'react-loading'

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await api.getAll();
      setProducts(response.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="home">
      <Header />
      <main>
        <h1 className="title">Products</h1>
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
          <div className="products">
            {products.map((product) => (
              <Link
                className="productLink"
                key={product._id}
                to={`/product/${product._id}`}
              >
                <Product product={product} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
