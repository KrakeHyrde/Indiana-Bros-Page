import styles from '../styles/productos.module.css'
import { useEffect, useState, useMemo, use } from "react"
import { useAuth }  from "../context/UserContext"
import { Button, Card, CardGroup } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form } from 'react-bootstrap';
import { useProducts } from '../context/ProductContext';
import * as formik from 'formik';
import * as yup from 'yup';

function Producto() {
  const [show, setShow] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null)
  //const [user, setUser] = useState(true)
  const [q, setQ] = useState("");

  const { UpdateProduct, GetProducts, DeleteProduct, products } = useProducts()
  const {user}  = useAuth()
  const { Formik } = formik;
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

  const filtered = useMemo(() => {
  const needle = norm(q.trim());
  if (!needle) return products;
  return products.filter(p =>
    norm(p.title || "").includes(needle) ||
    norm(p.category || "").includes(needle)
  );}, [q, products]);

  
  useEffect(() => {
    GetProducts()
  }, [products])

  const handleDelete = async (id) => {
    
    const response = await DeleteProduct(id); 

    if (response) {
      alert("Producto eliminado correctamente")
    }
    
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOpenEdit = (product) => {
    handleShow();
    setProductToEdit(product);
  }


  const handleUpdate = async (values, { setSubmitting }) => {
    //productToEdit = 
    const updatedProduct = {
      id: productToEdit.id,
      title: values.titleEdit,
      price: Number(values.priceEdit),
      description: values.descriptionEdit,
      category: values.categoryEdit,
      image: productToEdit.image,
    }

    try {

      const response = await UpdateProduct( productToEdit.id, updatedProduct);
      
      if (response) {
        alert("Producto actualizado correctamente")
        handleClose();
      }
    } catch (error) {
      console.log(error)
    }
  }
  const schema = yup.object().shape({
    titleEdit: yup.string().required("Necesitar ingresar un título"),
    priceEdit: yup.number().required("Necesitar ingresar un precio").positive("El precio debe ser positivo").min(0, "El precio no puede ser negativo"),
    descriptionEdit: yup.string().required("Necesitar ingresar una descripción"),
    categoryEdit: yup.string().required("Necesitar ingresar una categoría"),
  });

  return (
    <div className={styles.objetoProductos}>
        <div className={styles.buscador}>
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
          show && 
          <Offcanvas className='flex-column' show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton className='d-flex justify-content-center align-items-center'>
              <Offcanvas.Title>Editando Producto</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Formik
                validationSchema={schema}
                onSubmit={handleUpdate}
                initialValues={{
                  titleEdit: productToEdit?.title || '',
                  priceEdit: productToEdit?.price || '',
                  descriptionEdit: productToEdit?.description || '',
                  categoryEdit: productToEdit?.category || '',
                  imageEdit: productToEdit?.image || '',
                }}
              >
                {({ handleSubmit, handleChange, handleBlur, touched, values, errors }) => (
                  <Form onSubmit={handleSubmit} noValidate className='flex-column justify-content-center align-items-center m-3'>
                    <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Control
                        type="text"
                        name="titleEdit"
                        placeholder="Ingrese el titulo"
                        onBlur={handleBlur}
                        value={values.titleEdit}
                        onChange={handleChange}
                        isInvalid={touched.titleEdit && !!errors.titleEdit}
                      /> 
                      <Form.Control.Feedback type="invalid">{errors.titleEdit}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPrice">
                      <Form.Control 
                        type="number"
                        name="priceEdit"
                        onBlur={handleBlur}
                        placeholder="Ingrese el precio"
                        value={values.priceEdit}
                        onChange={handleChange}
                        isInvalid={touched.priceEdit && !!errors.priceEdit}
                      />
                      <Form.Control.Feedback type="invalid">{errors.priceEdit}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Control
                        as='textarea'
                        name="descriptionEdit"
                        onBlur={handleBlur}
                        placeholder="Ingrese la descripción"
                        value={values.descriptionEdit}
                        onChange={handleChange}
                        isInvalid={touched.descriptionEdit && !!errors.descriptionEdit}
                      />
                      <Form.Control.Feedback type="invalid">{errors.descriptionEdit}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCategory">
                      <Form.Control
                        type='text'
                        name="categoryEdit"
                        onBlur={handleBlur}
                        placeholder="Ingrese la categoria"
                        value={values.categoryEdit}
                        onChange={handleChange}
                        isInvalid={touched.categoryEdit && !!errors.categoryEdit}
                      />
                      <Form.Control.Feedback type="invalid">{errors.categoryEdit}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type='submit'>Actualizar</Button>
                  </Form>
                )}
              </Formik>
            </Offcanvas.Body>
          </Offcanvas>
        }

        <div className={styles.cart}>
          <div className={styles.wrapper}>
            {filtered.length === 0 ? (
              <p style={{ textAlign: "center", width: "100%", marginTop: 16 }}>
                No se encontraron resultados para “{q}”.
              </p>
            ) : (
              filtered.map(product => (
                <Card key={product.id} className={styles.productCard}>
                  <Card.Img className={styles.imagen} src={product.image} alt={`Imagen de ${product.title}`} />
                  <Card.Header className={styles.title}>{product.title}</Card.Header>
                  <Card.Body>
                    <Card.Subtitle>Precio: ${product.price}</Card.Subtitle>
                    <Card.Subtitle>Categoría: <strong>{product.category}</strong></Card.Subtitle>
                    <Card.Text className={styles.text}>{product.description}</Card.Text>

                    {user && (
                      <div /* footer propio, sin utilidades bootstrap */>
                        <button className={styles.buttonProduct} onClick={() => handleOpenEdit(product)}>Actualizar</button>
                        <button className={styles.buttonProduct} onClick={() => handleDelete(product.id)}>Borrar</button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </div>
    </div>
  )
    
  
}
export {Producto}