import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate, useLocation } from 'react-router-dom'

import LogoImage from "../images/logo.png";

import "../styles/header.css";

function Header() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = () => {
    if(searchActive && searchText !== ""){
      if(location.pathname.includes("/search")){
        navigate('/search/' + searchText)
        navigate(0)
      } else {
        navigate('/search/' + searchText)
      }
    }

    if(!searchActive) {
      setSearchActive(true)
      document.querySelector(".searchInput").focus()
    }

    if(searchActive && searchText === "") setSearchActive(false)
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={LogoImage} alt="E-Shop" />
      </Link>
      <nav>
        <ul>
          <li className="search">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`${searchActive ? "active" : ""} searchInput`}
            />
            <button className="searchButton" onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </li>
          <li>
            <Link className="profileButton" to="/profile"><i className="fas fa-user"></i></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
