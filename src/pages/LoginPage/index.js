import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import "../../styles/login-page.css";

import LogoImage from "../../images/logo.png";

import api from "../../services/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailRed, setEmailRed] = useState(false);
  const [passwordRed, setPasswordRed] = useState(false);

  const navigate = useNavigate();

  const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    if (!checkEmail(email)) {
      setEmailRed(true);
      toast.error("O email precisa seguir o formato: exemplo@exemplo.com", {
        style: {
          fontSize: "1.6rem",
          fontFamily: "Poppins, sans-serif",
        },
      });
    } else {
      setPasswordRed(false);
    }

    if (password.length < 4) {
      setPasswordRed(true);
      toast.error("A senha precisa ter mais de 4 caracteres", {
        style: {
          fontSize: "1.6rem",
          fontFamily: "Poppins, sans-serif",
        },
      });
    } else {
      setPasswordRed(false);
    }

    if (checkEmail(email) && password >= 4) {
      const data = {
        email: email,
        password: password,
      };

      const response = await api.login(data);

      if (response.status === 200) {
        navigate("/");
      } else {
        alert("Algo deu errado!");
      }
    }
  };

  return (
    <div className="loginPage">
      <Toaster />
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
            className={emailRed ? "error" : ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
        <div className="inputField">
          <input
            type="password"
            id="password"
            value={password}
            className={passwordRed ? "error" : ""}
            minLength="4"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <button className="loginButton" onClick={handleLogin} type="button">
          FAZER LOGIN
        </button>
      </form>
      <Link className="registerLink" to="/register">
        Ainda não possui uma conta? Crie uma conta
      </Link>
    </div>
  );
}

export default LoginPage;
