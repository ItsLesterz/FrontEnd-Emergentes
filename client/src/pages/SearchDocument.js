import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEye, FaDownload } from "react-icons/fa";
import "../styles/SearchDocument.css";

function SearchDocuments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [previewDocument, setPreviewDocument] = useState(null);
  const [documents, setDocuments] = useState([
    { id: 1, name: "Manual de Usuario - Monitor de Signos Vitales.pdf", url: "monitor-signos-vitales.pdf", type: "application/pdf" },
    { id: 2, name: "Guia Tecnica - Ventilador Mecanico.pdf", url: "ventilador-mecanico.pdf", type: "application/pdf" },
    { id: 3, name: "Instrucciones - Bomba de Infusion.pdf", url: "bomba-infusion.pdf", type: "application/pdf" },
    { id: 4, name: "Manual de Servicio - Electrocardiografo.pdf", url: "electrocardiografo.pdf", type: "application/pdf" },
    { id: 5, name: "Especificaciones - Desfibrilador Externo Automatico.pdf", url: "desfibrilador.pdf", type: "application/pdf" },
    { id: 6, name: "Manual Clínico - Equipo de Ultrasonido.pdf", url: "equipo-ultrasonido.pdf", type: "application/pdf" },
    { id: 7, name: "Guia de Instalacion - Maquina de Anestesia.pdf", url: "maquina-anestesia.pdf", type: "application/pdf" },
    { id: 8, name: "Instrucciones de Uso - Incubadora Neonatal.pdf", url: "incubadora-neonatal.pdf", type: "application/pdf" },
    { id: 9, name: "Manual Tecnico - Autoclave de Esterilizacion.pdf", url: "autoclave-esterilizacion.pdf", type: "application/pdf" },
    { id: 10, name: "Guia del Usuario - Lampara Quirurgica.pdf", url: "lampara-quirurgica.pdf", type: "application/pdf" },
  ]);
  

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviewDocument = (doc) => {
    setPreviewDocument(doc);
  };

  const handleClosePreview = () => {
    setPreviewDocument(null);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Buscar Documentos</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar documentos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="list-group">
          {filteredDocuments.map((doc) => (
            <li key={doc.id} className="list-group-item d-flex justify-content-between align-items-center">
              {doc.name}
              <div>
                <button className="btn btn-link" onClick={() => handlePreviewDocument(doc)}>
                  <FaEye />
                </button>
                <a href={doc.url} download={doc.name} className="btn btn-link">
                  <FaDownload />
                </a>
              </div>
            </li>
          ))}
        </ul>

        {previewDocument && (
          <div className="preview-modal">
            <div className="preview-content">
              <button className="btn btn-danger" onClick={handleClosePreview}>Cerrar</button>
              {previewDocument.type === "application/pdf" ? (
                <iframe
                  title="Document Preview"
                  src={previewDocument.url}
                  width="100%"
                  height="500px"
                />
              ) : (
                <img
                  src={previewDocument.url}
                  alt="Document Preview"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchDocuments;
