import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

import '../../styles/search-page.css'

import Product from "../../components/Product";
import Header from "../../components/Header";

function SearchPage() {
  const productToSearch = useParams().name;
  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    async function fetchData() {
      const response = await api.search(productToSearch);

      setProducts(response.data);
    }

    fetchData();

    console.log(products);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="searchPage">
      <Header />
      <main>
        <h1 className="title">Resultados para "{productToSearch}"</h1>
        {products.length > 0 ? (
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
        ) : (
          <div className="no-results">
            <p>Nenhum resultado para "{productToSearch}"</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
