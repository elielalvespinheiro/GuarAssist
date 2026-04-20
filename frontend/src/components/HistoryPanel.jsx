 
// src/components/HistoryPanel.jsx
import { useEffect, useState } from "react"
import { fetchHistory } from "../services/api"

export default function HistoryPanel() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
      .then(setHistory)
      .catch(() => setHistory([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="loading-text">Carregando histórico...</p>
  if (history.length === 0) return <p className="loading-text">Nenhuma análise realizada ainda.</p>

  return (
    <div className="history-panel">
      <h2>Histórico de Análises</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Arquivo</th>
            <th>Status</th>
            <th>Praga</th>
            <th>Confiança</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.timestamp * 1000).toLocaleString("pt-BR")}</td>
              <td>{item.filename}</td>
              <td className={item.status === "saudavel" ? "text-green" : "text-red"}>
                {item.status === "saudavel" ? "✅ Saudável" : "⚠️ Praga"}
              </td>
              <td>{item.disease || "—"}</td>
              <td>{Math.round(item.confidence * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
