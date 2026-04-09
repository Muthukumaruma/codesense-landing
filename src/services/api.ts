const API_BASE = import.meta.env.VITE_API_URL || 'https://api.codesense.online'

export async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}
