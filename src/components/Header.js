import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate, useLocation } from "react-router-dom";

import LogoImage from "../images/logo.png";
import CartIcon from "../images/cart.svg";
import SearchIcon from "../images/search.svg";

import "../styles/header.css";

function Header() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    if (location.pathname === "/") {
      navigate(0);
    }
  };

  const handleSearch = () => {
    if (searchText === "") {
      return;
    }

    navigate("/search/" + searchText);
    navigate(0);
  };

  return (
    <header className="header">
      <Link onClick={handleHome} to="/">
        <img src={LogoImage} alt="E-Shop" />
      </Link>
      <nav>
        <ul>
          <li className="search">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar produtos, marcas, etc..."
              className="searchInput"
            />
            <button className="searchButton" onClick={handleSearch}>
              <img src={SearchIcon} alt="Pesquisar" title="Pesquisar" />
            </button>
          </li>
          <li className="cart">
            <Link className="cartButton" to="/cart">
              <img
                src={CartIcon}
                alt="Carrinho de Compras"
                title="Carrinho de Compras"
              />
            </Link>
          </li>
          <li className="registerAndLogin">
            {/* <Link className="profileButton" to="/profile"><i className="fas fa-user"></i></Link> */}
            <Link title="Registrar" className="registerButton" to="/register">
              REGISTRAR
            </Link>
            <Link title="Login" className="loginButton" to="/login">
              LOGIN
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
