import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaEye, FaDownload, FaUpload } from "react-icons/fa";
import '../styles/Home.css'; // Importar el CSS

function Home() {
  const [documents, setDocuments] = useState([]);
  const [view, setView] = useState("list");
  const [uploadingFile, setUploadingFile] = useState(null);
  const [fileName, setFileName] = useState(""); 
  const [uploadDate, setUploadDate] = useState(""); 
  const [description, setDescription] = useState(""); // Para la descripción
  const [category, setCategory] = useState("Manual"); // Para la categoría
  const [showUploadForm, setShowUploadForm] = useState(false); 
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
        name: fileName || file.name,
        uploadDate: uploadDate || new Date().toLocaleString(),
        description,
        category,
        url: URL.createObjectURL(file),
        type: file.type,
      };

      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
      setUploadingFile(null);
      setFileName("");
      setUploadDate("");
      setDescription(""); // Limpiar la descripción
      setCategory("Manual"); // Restablecer la categoría
      setShowUploadForm(false); 
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
        
        <button className="btn btn-primary mb-3" onClick={() => setShowUploadForm(true)}>
          <FaUpload /> Subir Documento
        </button>

        {showUploadForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <form onSubmit={handleUploadDocument} className="form">
                <h4>Subir Documento</h4>
                <div className="mb-3">
                  <label htmlFor="fileName" className="form-label">Nombre del archivo</label>
                  <input
                    id="fileName"
                    type="text"
                    className="form-control"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="uploadDate" className="form-label">Fecha de subida</label>
                  <input
                    id="uploadDate"
                    type="text"
                    className="form-control"
                    value={uploadDate || new Date().toLocaleString()}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <select
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="Manual">Manual</option>
                    <option value="Diccionario">Diccionario</option>
                    <option value="Libro de Texto">Libro de Texto</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="file-upload" className="btn btn-secondary">Seleccionar Archivo</label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={(e) => setUploadingFile(e.target.files[0])}
                    required
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="mb-3 text-end">
                  <button type="submit" className="btn btn-success" disabled={!uploadingFile}>
                    Subir
                  </button>
                  <button type="button" className="btn btn-danger ms-2" onClick={() => setShowUploadForm(false)}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
              <li key={doc.id} className="list-group-item">
                <div>
                  <strong>{doc.name}</strong>
                  <p>{doc.description}</p>
                  <small>Categoría: {doc.category}</small>
                  <div className="text-end">
                    <button className="btn btn-link" onClick={() => handleViewDocument(doc.url)}>
                      <FaEye />
                    </button>
                    <a href={doc.url} download={doc.name} className="btn btn-link">
                      <FaDownload />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="d-flex flex-wrap">
            {documents.map((doc) => (
              <div key={doc.id} className="card m-2" style={{ width: "200px" }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{doc.name}</h5>
                  <p className="card-text">{doc.description}</p>
                  <p className="card-text"><small>{doc.category}</small></p>
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
