import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaEye, FaDownload, FaUpload } from "react-icons/fa";
import '../styles/Home.css'; // Importar el CSS

function Home() {
  const [documents, setDocuments] = useState([]);
  const [view, setView] = useState("list");
  const [uploadingFile, setUploadingFile] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cerrar sesión");
    navigate("/login");
  };

  const handleUploadDocument = (event) => {
    event.preventDefault();
    const file = uploadingFile;

    if (file) {
      const newDocument = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
      };

      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
      setUploadingFile(null);
    }
  };

  const handleViewDocument = (url) => {
    window.open(url, "_blank");
  };

  const handlePreviewDocument = (doc) => {
    setPreviewDocument(doc);
  };

  const handleClosePreview = () => {
    setPreviewDocument(null);
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="container mt-4">
        <h2>Documentos Subidos</h2>
        <form onSubmit={handleUploadDocument} className="mb-3 d-flex align-items-center">
          <label htmlFor="file-upload" className="btn btn-primary me-2">
            <FaUpload />
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            onChange={(e) => setUploadingFile(e.target.files[0])}
            required
            style={{ display: 'none' }}
          />
          <button type="submit" className="btn btn-success" disabled={!uploadingFile}>
            Subir
          </button>
        </form>

        <div className="mb-3">
          <button className="btn btn-secondary me-2" onClick={() => setView("list")}>
            Ver como Lista
          </button>
          <button className="btn btn-secondary" onClick={() => setView("icon")}>
            Ver como Iconos
          </button>
        </div>

        {view === "list" ? (
          <ul className="list-group">
            {documents.map((doc) => (
              <li key={doc.id} className="list-group-item d-flex justify-content-between align-items-center">
                {doc.name}
                <div>
                  <button className="btn btn-link" onClick={() => handleViewDocument(doc.url)}>
                    <FaEye />
                  </button>
                  <a href={doc.url} download={doc.name} className="btn btn-link">
                    <FaDownload />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="d-flex flex-wrap">
            {documents.map((doc) => (
              <div key={doc.id} className="card m-2" style={{ width: "150px" }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{doc.name}</h5>
                  <button className="btn btn-link" onClick={() => handlePreviewDocument(doc)}>
                    <FaEye />
                  </button>
                  <a href={doc.url} download={doc.name} className="btn btn-link">
                    <FaDownload />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

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

export default Home;
