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

import utils from './services/utils'

function App() {
  useEffect(() => {
    utils.checkCart()
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductPage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/search/:name" element={<SearchPage />} />
      </Switch>
    </Router>
  );
}

export default App;
