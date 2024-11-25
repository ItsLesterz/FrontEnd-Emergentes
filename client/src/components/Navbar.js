import React from 'react';
import { Link } from 'react-router-dom'; // Para la navegación
import { DropdownButton, Dropdown } from 'react-bootstrap'; // Para el dropdown

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/landing">
          <h2>DocStation</h2> {/* Título actualizado */}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/landing">Inicio</Link> {/* Cambiado para redirigir a /landing */}
            </li>

            {/* Dropdown para Documentos */}
            <li className="nav-item">
              <DropdownButton
                variant="link"
                id="dropdown-docs"
                title="Documentos" // Título de la opción
              >
                <Dropdown.Item as={Link} to="/home">Subir Documentos</Dropdown.Item> {/* Ruta para subir documentos */}
                <Dropdown.Item as={Link} to="/search">Buscar Documentos</Dropdown.Item> {/* Ruta para buscar documentos */}
              </DropdownButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
