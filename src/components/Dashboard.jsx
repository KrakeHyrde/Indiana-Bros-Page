import { useState } from "react"
import styles from '../styles/dashboard.module.css'
import { Button, Form } from "react-bootstrap"
import * as formik from 'formik';
import * as yup from 'yup';
import { useProducts } from "../context/ProductContext";

const Dashboard = () => {
  
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const { CreateProduct, products } = useProducts()
  const { Formik } = formik;

  const handleCreate = async (values, { setSubmitting }) => {

    setError(null)

    if (!values.name || !values.price || !values.description) {
      setError("Debes completar todos los campos")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: values.name,
      price: values.price,
      description: values.description,
      category: "",
      image: ""
    }

    const response = await CreateProduct(newProduct);
    
    setProduct(response);
  }
  const schema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio").min(3, "El nombre debe tener al menos 4 caracteres"),
    price: yup.number().required("El precio es obligatorio").positive("El precio debe ser positivo"),
    description: yup.string().required("La descripción es obligatoria")
  });
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Panel de Administración</h1>

      <section className={styles.dashboardSection}>
        <h2 className={styles.dashboardSubtitle}>Cargar nuevo producto</h2>
        <Formik
          initialValues={{ name: '', price: '', description: '' }}
          validationSchema={schema}
          onSubmit={handleCreate}
        > 
          {({ handleSubmit, handleChange, handleBlur, touched, values, errors }) => (
            <Form className={styles.dashboardForm} noValidate onSubmit={handleSubmit}>
              <Form.Group className={styles.dashboardField} controlId="formName">
                <Form.Label>Nombre del producto:</Form.Label>
                <Form.Control 
                  type="text"
                  name="name" 
                  placeholder="Nombre del producto"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name} 
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
    
              <Form.Group className={styles.dashboardField} controlId="formPrice">
                <Form.Label>Precio:</Form.Label>
                <Form.Control 
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="Precio del producto" 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  value={values.price}
                  isInvalid={touched.price && !!errors.price} 
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>
    
              <Form.Group className={styles.dashboardField} controlId="formDescription">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control 
                  as ="textarea"
                  name="description"
                  rows="4" 
                  placeholder="Descripción del producto"
                  onChange={handleChange}
                  onBlur={handleBlur} 
                  value={values.description} 
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
    
              {error && <p className={styles.dashboardError}>{error}</p>}
    
              <Button type="submit" className={styles.dashboardButton}>Guardar producto</Button>
            </Form>
          )}
        </Formik>
        {
          product && (
          <div className={styles.dashboardProduct}>
            <h3>Nombre: {product.title}</h3>
            <p>Precio: ${product.price}</p>
            <p>Descripción: {product.description}</p>
          </div>
        )}
      </section>
    </div>
  )
}

export { Dashboard }