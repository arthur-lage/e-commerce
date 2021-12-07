import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import '../../styles/login-page.css'

import LogoImage from "../../images/logo.png";

import api from "../../services/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };

    const response = await api.login(data);

    console.log(response);

    if (response.status === 200) {
      navigate("/");
    } else {
      alert("Algo deu errado!");
    }
  };

  return (
    <div className="loginPage">
      <div className="logo">
        <Link to="/">
          <img src={LogoImage} alt="E-Shop" />
        </Link>
      </div>
      <form>
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
            placeholder="Digite sua senha"
          />
        </div>
        <button className="loginButton" onClick={handleLogin} type="button">
          FAZER LOGIN
        </button>
      </form>
      <Link className="registerLink" to="/register">Ainda não possui uma conta? Crie uma conta</Link>
    </div>
  );
}

export default LoginPage;
