import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

import api from "../../services/api";

function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const productID = useParams().id;

  useEffect(() => {
    async function fetchData() {
      const response = await api.getByID(productID);
      console.log(response.data);
      setProductInfo(response.data);
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
        <Header />
      Product Page
      <div>
        <img width="150" src={productInfo.image} alt={productInfo.name} />
        <p>{productInfo.name}</p>
        <p>{productInfo.price}</p>
        <p>{productInfo.description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
