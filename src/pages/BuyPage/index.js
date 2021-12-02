import React, { useState, useEffect } from "react";

import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";

function BuyPage() {
  const [product, setProduct] = useState({});
  const [purchaseStep, setPurchaseStep] = useState(0);
  const [CPFText, setCPFText] = useState("");

  const navigate = useNavigate();

  const id = useParams().id;

  const handleCPF = (e) => {
    if (
      (e.keyCode == 8 && CPFText.length === 4) ||
      (e.keyCode == 8 && CPFText.length === 8) ||
      (e.keyCode == 8 && CPFText.length === 12)
    ) {
      setCPFText(CPFText.slice(0, -1));
      return;
    }

    if (CPFText.length === 3 || CPFText.length === 7) {
      setCPFText(CPFText + ".");
    }

    if (CPFText.length === 11) {
      setCPFText(CPFText + "-");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (purchaseStep === 4) {
      return;
    } else {
      setPurchaseStep(+1);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const productInfo = await api.getByID(id);
      setProduct(productInfo.data);
    }

    fetchData();
  }, []);

  return (
    <div className="buyPage">
      <Header />
      <h1>Buy Product</h1>
      <section className="currentStep">
        {purchaseStep === 0 ? (
          <form>
            <div className="inputField">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Type your first bame"
              />
            </div>
            <div className="inputField">
              <label htmlFor="secondName">Second name</label>
              <input
                id="secondName"
                name="secondName"
                placeholder="Type your second name"
              />
            </div>
            <div className="inputField">
              <label htmlFor="cpf">CPF</label>
              <input
                onChange={(e) => setCPFText(e.target.value)}
                onKeyDown={handleCPF}
                value={CPFText}
                id="cpf"
                maxLength="14"
                name="cpf"
                placeholder="CPF (XXX.XXX.XXX-XX)"
              />
            </div>
          </form>
        ) : (
          ""
        )}
        {purchaseStep === 1 ? <form></form> : ""}
        {purchaseStep === 2 ?? <div></div>}
        {purchaseStep === 3 ?? <div></div>}
      </section>
      <div className="actions">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleNext}>
          {purchaseStep < 4 ? "Next" : "Conclude"}
        </button>
      </div>
    </div>
  );
}

export default BuyPage;
