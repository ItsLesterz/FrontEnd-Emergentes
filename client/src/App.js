import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import SearchDocument from "./pages/SearchDocument";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdministrarUsuarios from "./pages/AdministrarUsuario";




function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/search" element={<SearchDocument />} />
        <Route path="/admin-users" element={<AdministrarUsuarios />} />
        <Route path="/search" component={<SearchDocument />} />
        <Route path="/landing" component={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
