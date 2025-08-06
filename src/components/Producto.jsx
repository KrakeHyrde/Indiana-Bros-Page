
import '../styles/productos.css'
import { useEffect, useState } from "react"
import { useAuth } from "../context/UserContext"
import { Card, CardBody, CardGroup } from 'react-bootstrap'
function Producto(props) {
      
  const [products, setProducts] = useState([])
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [user, setUser] = useState(true)
  // simulando existencia del usuario, proximamente este estado será global
  

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
  }

  // El array vacío (dependencias) espera a que ejecute el return del jsx. Si tiene algo, useEffect se va a ejecutar cada vez que se modifique lo que este dentro de la dependencia.
  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
      // fetchingProducts()
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          ))
        // fetchingProducts()
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

        {
          showPopup && <section className="popup-edit">
            <h2>Editando producto.</h2>
            <button onClick={() => setShowPopup(null)}>Cerrar</button>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              <button>Actualizar</button>
            </form>
          </section>
        }

          <div className='cart'>
          <CardGroup className='wrapper'>
            {             
              products.map((product) => <Card style={{ width: '18rem' }}key={product.id} className='card'>
                <img className='imagen' src={product.image} alt={`Imagen de ${product.title}`} />
                <Card.Body>
                  <h2 className='title' key={product.id}>{product.title}</h2>
                  <p>${product.price}</p>
                  <p className='text'>{product.description}</p>
                  <p><strong>{product.category}</strong></p>
                  {
                    user && <div>
                      <button className='buttonProduct'onClick={() => handleOpenEdit(product)}>Actualizar</button>
                      <button className='buttonProduct'onClick={() => handleDelete(product.id)}>Borrar</button>
                    </div>
                  }
                </Card.Body>
              </Card>)             
            }
          </CardGroup>
          </div>
    </>
  )
    
  
}
export {Producto}

  /*const [user, setUser] = useState(true)
  return (
    <div className="cart">
      <div className={`cart ${props.className}`}>
        <Card style={{ width: '18rem' }}>
          <Card.Img className='imagen' variant="top" src={props.img} alt='Portada de Videojuego'/>
          <Card.Body>
            <Card.Title className='title'>{props.title}</Card.Title>
            <Card.Text className='text'>
              {props.text}
            </Card.Text>
            {
              user && <div className='botonCard'>
                <Button className="modifybu" variant="primary">Modify</Button>
                <Button className="buybu" variant="primary">Buy</Button>
                <Button className="deletebu" variant="primary">Delete</Button>
              </div>
            }
          </Card.Body>
        </Card>
      </div>
    </div>
  );*/
