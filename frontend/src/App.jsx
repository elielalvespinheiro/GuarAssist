import { useState, useRef, useCallback } from "react"
import Webcam from "react-webcam"
import { analyzeImage } from "./services/api"
import ResultCard from "./components/ResultCard"
import HistoryPanel from "./components/HistoryPanel"
import "./App.css"

export default function App() {
  const [mode, setMode] = useState("upload") // "upload" | "camera"
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const webcamRef = useRef(null)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setResult(null)
    setError(null)
  }

  const captureFromCamera = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return
    setPreview(imageSrc)
    // Converte base64 para File
    fetch(imageSrc)
      .then(r => r.blob())
      .then(blob => {
        const captured = new File([blob], "captura.jpg", { type: "image/jpeg" })
        setFile(captured)
        setResult(null)
        setError(null)
        setMode("upload") // volta para tela de preview
      })
  }, [webcamRef])

  const handleAnalyze = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const data = await analyzeImage(file)
      setResult(data)
    } catch (err) {
      setError("Erro ao analisar imagem. Verifique se o servidor está rodando.")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">GuarAssist</span>
        </div>
        <button className="btn-ghost" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "← Voltar" : "Histórico"}
        </button>
      </header>

      <main className="main">
        {showHistory ? (
          <HistoryPanel />
        ) : (
          <>
            <div className="hero">
              <h1>Diagnóstico de pragas no guaraná</h1>
              <p>Envie uma foto ou use a câmera para analisar a planta.</p>
            </div>

            <div className="mode-tabs">
              <button className={mode === "upload" ? "tab active" : "tab"} onClick={() => setMode("upload")}>
                📁 Upload
              </button>
              <button className={mode === "camera" ? "tab active" : "tab"} onClick={() => setMode("camera")}>
                📷 Câmera
              </button>
            </div>

            {mode === "camera" && (
              <div className="camera-section">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="webcam"
                />
                <button className="btn-primary" onClick={captureFromCamera}>
                  Capturar Foto
                </button>
              </div>
            )}

            {mode === "upload" && (
              <div className="upload-section">
                {!preview ? (
                  <label className="dropzone">
                    <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                    <span className="dropzone-icon">🖼️</span>
                    <span>Clique para selecionar imagem</span>
                    <small>JPG, PNG ou WEBP</small>
                  </label>
                ) : (
                  <div className="preview-section">
                    <img src={preview} alt="Preview" className="preview-image" />
                    <div className="preview-actions">
                      <button className="btn-secondary" onClick={reset}>Trocar imagem</button>
                      <button className="btn-primary" onClick={handleAnalyze} disabled={loading}>
                        {loading ? "Analisando..." : "🔍 Analisar"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && <div className="error-msg">⚠️ {error}</div>}
            {result && <ResultCard result={result} />}
          </>
        )}
      </main>
    </div>
  )
}
