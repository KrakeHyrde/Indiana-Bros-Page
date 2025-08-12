import '../styles/productos.css'
import { useEffect, useState, useMemo } from "react"
import { useAuth } from "../context/UserContext"
import { Card, CardBody, CardGroup } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
function Producto(props) {
      
  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [user, setUser] = useState(true)
  const [q, setQ] = useState("");


const norm = (s) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

const filtered = useMemo(() => {
  const needle = norm(q.trim());
  if (!needle) return products;
  return products.filter(p =>
    norm(p.title || "").includes(needle) ||
    norm(p.category || "").includes(needle)
  );
}, [q, products]);

  

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
  }

 
  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))

    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOpenEdit = (product) => {
    handleShow();
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }


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
      }
      handleClose();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='objetoProductos'>
        <div className='buscador' style={{ maxWidth: 520, margin: "12px auto 0", padding: "0 12px" }}>
          <input
            type="text"
            placeholder="Buscar productos por nombre o categoría..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Buscar productos"
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "1rem",
              border: "1px solid #ddd",
              borderRadius: 8,
              outline: "none"
            }}
          />
        </div>
        {
          handleShow && <Offcanvas show={show} onHide={handleClose}>

            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Editando Producto</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
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
            </Offcanvas.Body>
          </Offcanvas>
        }

          <div className='cart'>
          <CardGroup className='wrapper'>
           {
              filtered.length === 0 ? (
                <p style={{ textAlign: "center", width: "100%", marginTop: 16 }}>
                  No se encontraron resultados para “{q}”.
                </p>
              ) : (
                filtered.map((product) => (
                  <Card style={{ width: '18rem' }} key={product.id} className='card'>
                    <img className='imagen' src={product.image} alt={`Imagen de ${product.title}`} />
                    <Card.Body>
                      <h2 className='title'>{product.title}</h2>
                      <p>${product.price}</p>
                      <p className='text'>{product.description}</p>
                      <p><strong>{product.category}</strong></p>
                      {user && (
                        <div>
                          <button className='buttonProduct' onClick={() => handleOpenEdit(product)}>Actualizar</button>
                          <button className='buttonProduct' onClick={() => handleDelete(product.id)}>Borrar</button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))
              )
            }
          </CardGroup>
          </div>
    </div>
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
