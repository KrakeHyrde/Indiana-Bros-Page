import { useState } from "react"
import  "../styles/dashboard.css"
const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !price || !description) {
      setError("Debes completar todos los campos")
      return
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    }

    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Administración</h1>

      <section className="dashboard-section">
        <h2 className="dashboard-subtitle">Cargar nuevo producto</h2>
        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="dashboard-field">
            <label>Nombre del producto:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div className="dashboard-field">
            <label>Precio:</label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>

          <div className="dashboard-field">
            <label>Descripción:</label>
            <textarea rows="4" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>

          {error && <p className="dashboard-error">{error}</p>}

          <button className="dashboard-button">Guardar producto</button>
        </form>

        {product && (
          <div className="dashboard-product">
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        )}
      </section>
    </div>
  )
}

export { Dashboard }