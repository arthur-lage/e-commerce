import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

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
      <Header />
      <h1>Login</h1>
      <form>
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
            placeholder="Digite sua senha"
          />
        </div>
        <button onClick={handleLogin} type="button">
          Login
        </button>
      </form>
      <Link to="/register">Não possui uma conta? Criar uma conta</Link>
    </div>
  );
}

export default LoginPage;
