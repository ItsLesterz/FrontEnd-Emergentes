// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <NavDropdown title="Perfil" id="basic-nav-dropdown" align="start">
            <NavDropdown.Item onClick={() => navigate("/profile")}>
              Ver Perfil
            </NavDropdown.Item>
            <NavDropdown.Item onClick={onLogout}>
              Cerrar Sesión
            </NavDropdown.Item>
          </NavDropdown>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto align-items-center">
          <Nav.Link href="#home">Inicio</Nav.Link>
          <Nav.Link href="#documents">Documentos</Nav.Link>
          <Nav.Link href="#about">Acerca de</Nav.Link>
          <Navbar.Brand href="#home">Documentación Digital</Navbar.Brand>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
