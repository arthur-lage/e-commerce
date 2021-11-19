import React, { useState, useEffect } from "react";

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
    <div>
      <Header />
      <h1>Products</h1>
      <div className="products">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
