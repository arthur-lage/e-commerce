import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/register-page.css";

import LogoImage from "../../images/logo.png";

import api from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameRed, setNameRed] = useState(false)
  const [emailRed, setEmailRed] = useState(false)
  const [passwordRed, setPasswordRed] = useState(false)


  const navigate = useNavigate();


    const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
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

    if(name.length <= 0){
      setNameRed(true)
      toast.error("Seu nome não pode estar vazio", {
        style: {
          fontSize: "1.6rem",
          fontFamily: "Poppins, sans-serif",
        },
      })
    } else {
      setNameRed(false)
    }

    if (checkEmail(email) && password >= 4 && name.length !== 0) {
      const data = {
        name: name,
        email: email,
        password: password,
      };

      const response = await api.register(data);

      if (response.status === 200) {
        navigate("/");
      } else {
        alert("Algo deu errado!");
      }
    }
  };

  return (
    <div className="registerPage">
      <Toaster />
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
            className={nameRed ? "error" : ""}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
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
