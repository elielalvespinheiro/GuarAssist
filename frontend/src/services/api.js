const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

export async function analyzeImage(imageFile) {
  const formData = new FormData()
  formData.append("file", imageFile)

  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.detail || "Erro desconhecido")
  }

  return response.json()
}

export async function fetchHistory() {
  const response = await fetch(`${BASE_URL}/history`)
  if (!response.ok) throw new Error("Erro ao buscar histórico")
  return response.json()
}