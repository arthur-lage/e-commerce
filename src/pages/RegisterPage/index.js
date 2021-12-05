import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

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
    <div className="loginPage">
      <Header />
      <h1>Login</h1>
      <form>
        <div className="inputField">
          <label htmlFor="name">Nome</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <div className="inputField">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
        <div className="inputField">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite seu senha"
          />
        </div>
        <button onClick={handleRegister} type="button">
          Registrar
        </button>
      </form>
      <Link to="/login">Já possui uma conta? Fazer login</Link>
    </div>
  );
}

export default RegisterPage;
