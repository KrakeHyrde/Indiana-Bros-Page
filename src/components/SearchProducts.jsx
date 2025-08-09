import { useEffect, useMemo, useState } from "react"

const SearchProducts = () => {
  const [q, setQ] = useState("")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products")
        if (!res.ok) throw new Error("Error al cargar productos")
        const data = await res.json()
        if (alive) setProducts(data)
      } catch (e) {
        if (alive) setError(e.message || "Error desconocido")
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [])

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")

  const results = useMemo(() => {
    const needle = norm(q.trim())
    if (!needle) return products
    return products.filter(p =>
      norm(p.title).includes(needle) || norm(p.category).includes(needle)
    )
  }, [q, products])

  return (
    <section style={{ maxWidth: 920, margin: "0 auto", padding: "16px" }}>
      <h2 style={{ margin: "0 0 8px 0" }}>Buscar productos</h2>

      <input
        type="text"
        placeholder="Escribí para buscar por nombre o categoría…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Buscar productos"
        style={{
          width: "100%",
          padding: "12px 14px",
          fontSize: "1rem",
          borderRadius: 8,
          border: "1px solid #ddd",
          outline: "none",
        }}
      />

      {loading && <p style={{ marginTop: 12 }}>Cargando productos…</p>}
      {error && <p style={{ marginTop: 12, color: "crimson" }}>{error}</p>}
      {!loading && !error && results.length === 0 && q && (
        <p style={{ marginTop: 12 }}>No se encontraron resultados.</p>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16
        }}
      >
        {results.map((p) => (
          <li key={p.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12, background: "white" }}>
            <div style={{ display: "grid", gridTemplateRows: "160px auto", gap: 8 }}>
              <img
                src={p.image}
                alt={p.title}
                style={{ width: "100%", height: 160, objectFit: "contain" }}
                loading="lazy"
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: ".95rem", lineHeight: 1.25, minHeight: 38 }}>
                  {p.title}
                </div>
                <div style={{ opacity: .7, fontSize: ".85rem", marginTop: 4 }}>{p.category}</div>
                <div style={{ marginTop: 8, fontWeight: 700 }}>${(p.price ?? 0).toFixed(2)}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export {SearchProducts}