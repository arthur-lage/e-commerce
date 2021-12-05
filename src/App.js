import "./styles/global.css";

import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import BuyPage from "./pages/BuyPage";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import utils from './services/utils'

function App() {
  useEffect(() => {
    utils.checkCart()
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/buy/:id" element={<BuyPage />} />
        <Route exact path="/product/:id" element={<ProductPage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/search/:name" element={<SearchPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Switch>
    </Router>
  );
}

export default App;
