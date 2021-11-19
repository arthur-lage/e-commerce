import "./styles/global.css";

import React from "react";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductPage />} />
        <Route exact path="/profile" element={<Profile />} />
      </Switch>
    </Router>
  );
}

export default App;
