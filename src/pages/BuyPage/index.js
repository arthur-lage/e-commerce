import React, { useState, useEffect } from "react";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import toast, { Toaster } from "react-hot-toast";

import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import axios from "axios";

function BuyPage() {
  const [product, setProduct] = useState({});
  const [purchaseStep, setPurchaseStep] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [CPFText, setCPFText] = useState("");

  const [CEPText, setCEPText] = useState("");
  const [rua, setRua] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")
  const [address2, setAddress2] = useState("");
  const [addressNumber, setAddressNumber] = useState("");

  const [CEPresult, setCEPresult] = useState({});

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardFocused, setCardFocused] = useState("");

  const [paymentForm, setPaymentForm] = useState(1);

  const [nextDisabled, setNextDisabled] = useState(undefined);

  const navigate = useNavigate();

  const id = useParams().id;

  // start handle inputs

  const handleCPF = (e) => {
    if (
      (e.keyCode === 8 && CPFText.length === 4) ||
      (e.keyCode === 8 && CPFText.length === 8) ||
      (e.keyCode === 8 && CPFText.length === 12)
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

  const handleCardNumber = (e) => {
    if (cardNumber.length === 4) {
      setCardNumber(cardNumber + " ");
    }

    if (cardNumber.length === 9) {
      setCardNumber(cardNumber + " ");
    }

    if (cardNumber.length === 14) {
      setCardNumber(cardNumber + " ");
    }
  };

  const handleCardExpirationDate = (e) => {
  };

  // end handle inputs

  // start actions

  const handleCancel = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (purchaseStep === 4) {
      setPurchaseStep(5);
    } else {
      setPurchaseStep(purchaseStep + 1);
    }
  };

  const handleBack = () => {
    setPurchaseStep(purchaseStep - 1);
  };

  // end actions

  // start useEffects

  useEffect(() => {
    if (purchaseStep === 0) {
      document.getElementById("back").disabled = true;
    }

    if (purchaseStep > 0 && purchaseStep !== 5) {
      document.getElementById("back").disabled = false;
    }
  }, [purchaseStep]);

  useEffect(() => {
    if (purchaseStep === 0) {
      if (firstName.length === 0) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }

      if (secondName.length === 0) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }

      if (
        CPFText.length === 0 ||
        CPFText.length < 14 ||
        /[a-zA-Z]/g.test(CPFText)
      ) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }

    if (purchaseStep === 1) {
      if (!CEPresult) {
        setNextDisabled(true);
      }

      if (Number(addressNumber) === 0 || addressNumber.length === "") {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }

    if (purchaseStep === 2) {
      if (cardNumber.length === 0 || cardName.length < 20) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }

      if (cardName.length === 0) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }

      if (cardExpirationDate.length === 0 || cardExpirationDate.length < 5) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }

      if (cardCVC.length === 0 || cardCVC.length < 3) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }
  }, [
    purchaseStep,
    firstName,
    secondName,
    CPFText,
    CEPText,
    addressNumber,
    cardNumber,
    cardName,
    cardExpirationDate,
    cardCVC,
  ]);

  const handleCEP = async () => {
    if (CEPText.length < 8) {
      toast.error("CEP inválido", {
        style: {
          fontSize: "1.6rem",
          fontFamily: "Poppins, sans-serif",
        },
      });

      return
    }

    if (CEPText.length === 8) {
      let URL = "https://viacep.com.br/ws/" + CEPText + "/json/";

      const response = await axios.get(URL);
      setCEPresult(response.data);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const productInfo = await api.getByID(id);
      setProduct(productInfo.data);
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (purchaseStep === 1 && CEPresult.erro) {
      setNextDisabled(true);
    }

    if (/[a-zA-Z]/g.test(CEPText)) {
      setNextDisabled(true);
    }

    if(CEPText.length === 0){
      setNextDisabled(true)
    }

    if(CEPText.length < 8){
      setNextDisabled(true)
    }
  }, [CEPresult, purchaseStep, CEPText]);

  useEffect(() => {
    if(CEPresult.erro){
      setRua("")
      setBairro("")
      setCidade("")
      setUf("")
    } 
    
    if(!CEPresult.erro) {
      setRua(CEPresult.logradouro)
      setBairro(CEPresult.bairro)
      setCidade(CEPresult.localidade)
      setUf(CEPresult.uf)
    }
  }, [CEPresult])

  // end useEffects

  return (
    <div className="buyPage">
      <Toaster />
      <Header />
      <h1>Comprar produto</h1>
      <section className="currentStep">
        {purchaseStep === 0 ? (
          <form>
            <div className="inputField">
              <label htmlFor="firstName">Primeiro nome</label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                id="firstName"
                name="firstName"
                placeholder="Digite seu primeiro nome"
              />
            </div>
            <div className="inputField">
              <label htmlFor="secondName">Sobrenome</label>
              <input
                onChange={(e) => setSecondName(e.target.value)}
                value={secondName}
                id="secondName"
                name="secondName"
                placeholder="Digite seu sobrenome"
              />
            </div>
            <div className="inputField">
              <label htmlFor="cpf">CPF</label>
              <input
                autoComplete="off"
                onChange={(e) => setCPFText(e.target.value)}
                onKeyDown={handleCPF}
                value={CPFText}
                id="cpf"
                maxLength="14"
                name="cpf"
                placeholder="Digite seu CPF"
              />
            </div>
          </form>
        ) : (
          ""
        )}
        {purchaseStep === 1 ? (
          <form>
            <div className="inputField">
              <label htmlFor="cep">CEP</label>
              <input
                maxLength="8"
                max="8"
                onChange={(e) => setCEPText(e.target.value)}
                value={CEPText}
                placeholder="Digite o CEP para entrega"
                autoComplete="off"
                id="cep"
              />
              <button type="button" onClick={handleCEP}>
                Buscar CEP
              </button>
            </div>
            <div className="inputField">
              <label htmlFor="rua">Rua</label>
              <input
                maxLength="9"
                disabled
                value={rua}
                autoComplete="off"
                id="rua"
              />
            </div>
            <div className="inputField">
              <label htmlFor="bairro">Bairro</label>
              <input
                maxLength="9"
                disabled
                value={bairro}
                autoComplete="off"
                id="bairro"
              />
            </div>
            <div className="inputField">
              <label htmlFor="cidade">Cidade</label>
              <input
                maxLength="9"
                disabled
                value={cidade}
                autoComplete="off"
                id="cidade"
              />
            </div>
            <div className="inputField">
              <label htmlFor="estado">Estado</label>
              <input
                maxLength="9"
                disabled
                value={uf}
                autoComplete="off"
                id="estado"
              />
            </div>
            <div className="inputField">
              <label htmlFor="complemento">Complemento</label>
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                placeholder="Ex: Apartamento 201"
                autoComplete="off"
                id="complemento"
              />
            </div>
            <div className="inputField">
              <label htmlFor="numero">Número</label>
              <input
                placeholder="Ex: 1754"
                autoComplete="off"
                type="text"
                onChange={(e) => setAddressNumber(e.target.value)}
                value={addressNumber}
                id="numero"
              />
            </div>
          </form>
        ) : (
          ""
        )}
        {purchaseStep === 2 ? (
          <div>
            <Cards
              cvc={cardCVC}
              expiry={cardExpirationDate}
              focused={cardFocused}
              name={cardName}
              number={cardNumber}
            />
            <form>
              <div className="cardNumberWrapper">
                <input
                  type="tel"
                  name="cardNumber"
                  maxLength="19"
                  max="16"
                  placeholder="Numero do Cartão"
                  value={cardNumber}
                  onKeyDown={(e) => handleCardNumber(e.target.value)}
                  onChange={(e) => setCardNumber(e.target.value)}
                  onFocus={(e) => setCardFocused("number")}
                />
                <p>Ex: 1234 5678 9999 0000</p>
              </div>
              <div className="cardNameWrapper">
                <input
                  type="text"
                  name="cardName"
                  value={cardName}
                  placeholder="Nome do Cartão"
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  onFocus={(e) => setCardFocused("name")}
                />
              </div>
              <div className="expirationDataAndCVV">
                <input
                  type="text"
                  maxLength="5"
                  max="5"
                  value={cardExpirationDate}
                  name="cardExpirationDate"
                  placeholder="Validade do Cartão"
                  onChange={(e) => setCardExpirationDate(e.target.value)}
                  onKeyDown={(e) => handleCardExpirationDate(e.target.value)}
                  onFocus={(e) => setCardFocused("expiry")}
                />
                <input
                  type="text"
                  maxLength="3"
                  max="3"
                  value={cardCVC}
                  name="cardCVC"
                  placeholder="Codigo de Segurança"
                  onChange={(e) => setCardCVC(e.target.value)}
                  onFocus={(e) => setCardFocused("cvc")}
                />
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
        {purchaseStep === 3 ? (
          <div>
            <select value={paymentForm} onChange={(e) => setPaymentForm(e.target.value)}>
              <option value={1}>
                1x de R${" "}
                {(product.price / 1)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={2}>
                2x de R${" "}
                {(product.price / 2)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={3}>
                3x de R${" "}
                {(product.price / 3)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={4}>
                4x de R${" "}
                {(product.price / 4)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={5}>
                5x de R${" "}
                {(product.price / 5)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={6}>
                6x de R${" "}
                {(product.price / 6)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={7}>
                7x de R${" "}
                {(product.price / 7)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={8}>
                8x de R${" "}
                {(product.price / 8)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={9}>
                9x de R${" "}
                {(product.price / 9)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
              <option value={10}>
                10x de R${" "}
                {(product.price / 10)
                  .toFixed(2)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace(".", ",")}{" "}
                s/ juros
              </option>
            </select>
          </div>
        ) : (
          ""
        )}
        {purchaseStep === 4 ? (
          <div>
            <div className="personalInfo">
              <h3>Informações pessoais</h3>
              <div className="name">
                <p>Primeiro nome: {firstName}</p>
                <p>Sobrenome: {secondName}</p>
              </div>
              <p>CPF: {CPFText}</p>
            </div>
            <div className="addressInfo">
              <h3>Endereço</h3>

              <p>CEP: {CEPText}</p>

              <div className="address">
                <p>Rua: {CEPresult.logradouro}</p>
                <p>Bairro: {CEPresult.bairro}</p>
                <p>Cidade: {CEPresult.localidade}</p>
                <p>Estado: {CEPresult.uf}</p>
              </div>
              <div className="address2andNumber">
                <p>Complemento: {address2}</p>
                <p>Número: {addressNumber}</p>
              </div>
            </div>
            <div className="cardInfo">
              <h3>Informação do cartão</h3>

              <p>Número do cartão: {cardNumber}</p>
              <p>Nome do cartão: {cardName}</p>
              <p>Validade do cartão: {cardExpirationDate}</p>
              <p>Código de segurança: {cardCVC}</p>
            </div>
            <div className="paymentInfo">
              <h3>Opção de pagamento</h3>

              <p>
                {paymentForm}x de R${" "}
                {(product.price / Number(paymentForm))
                  .toFixed(2)
                  .replace(".", ",")}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {purchaseStep === 5 ? (
          <div>
            <h2 className="thanksForBuying">Obrigado por comprar conosco!</h2>
            <img src={product.image} alt={product.name} />
            <p>Você receberá seu produto em breve!</p>
          </div>
        ) : (
          ""
        )}
      </section>
      {purchaseStep !== 5 ? (
        <div className="actions">
          <button onClick={handleCancel}>Cancelar</button>
          <button id="back" onClick={handleBack}>
            Voltar
          </button>
          <button disabled={nextDisabled} id="next" onClick={handleNext}>
            {purchaseStep < 4 ? "Próximo" : "Concluir"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BuyPage;
