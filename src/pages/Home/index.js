import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'

import "../../styles/home.css";
import api from "../../services/api";

import Product from "../../components/Product";
import Header from "../../components/Header";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.getAll();
      setProducts(response.data);
    }

    fetchData();
  }, []);

  return (
    <div className="home">
      <Header />
      <main>
        <h1 className="title">Products</h1>
        <div className="products">
          {products.map((product) => (
            <Link className="productLink" key={product._id} to={`/product/${product._id}`}>
              <Product product={product} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
