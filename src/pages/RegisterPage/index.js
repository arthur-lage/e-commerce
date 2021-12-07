import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/register-page.css";

import LogoImage from "../../images/logo.png";

import api from "../../services/api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    const response = await api.register(data);

    console.log(response);

    if (response.status === 200) {
      navigate("/");
    } else {
      alert("Algo deu errado!");
    }
  };

  return (
    <div className="registerPage">
      <div className="logo">
        <Link to="/">
          <img src={LogoImage} alt="E-Shop" />
        </Link>
      </div>
      <form>
        <div className="inputField">
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <div className="inputField">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
        <div className="inputField">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite seu senha"
          />
        </div>
        <button
          className="registerButton"
          onClick={handleRegister}
          type="button"
        >
          CRIAR CONTA
        </button>
      </form>
      <Link className="loginLink" to="/login">
        Já possui uma conta? Faça login
      </Link>
    </div>
  );
}

export default RegisterPage;
