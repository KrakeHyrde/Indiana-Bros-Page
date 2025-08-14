import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/loginregi.css"
import {Button, Form, Spinner} from 'react-bootstrap';
import {useAuth}  from "../context/UserContext"
import * as formik from 'formik';
import * as yup from 'yup';

const LoginRegister = () => {
    return (
      <div className="decision" >
          <Link to="/login"><Button className="inicia">Inicia Sesion</Button></Link>
          <Link to="/register"><Button className="register">Registrate</Button></Link>
          
      </div>
    )
}

const Register = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const { Register } = useAuth()
  const nagivate = useNavigate()
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().min(3, 'must be at least 3 characters long').email('must be a valid email').required(),
    password: yup.string().required(),
  });
  
  const handleSubmit = async (values, { setSubmitting }) => {
    
    setIsLoading(true);

    const isRegistered= await Register(values.name, values.email, values.password)
    
    if (isRegistered) {
      setIsLoading(false)
      setSuccess("Usuario creado con éxito")
      setTimeout(() => {
        nagivate("/")
      }, 2000);

      return
    }
    setError("El usuario no pudo ser creado")
    setIsLoading(false)
  }

  return (
    <div className="reRegister">
      <h1>Registrate</h1>

      <section>
        <h2>Hola, bienvenido</h2>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, touched, values, errors }) => (

            <Form className="m-5" noValidate  onSubmit={handleSubmit}>
              <Form.Group className="m-3" controlId="validationUsername">
                <Form.Label >Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Nombre de usuario"
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-3" controlId="validationEmail">
                <Form.Label>Correo electrónico:</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-3" controlId="validationPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit">Registrar</Button>
            </Form>
          )}
        </Formik>
        
        {
          isLoading &&
          <div className='d-flex justify-content-center item-center mb-3'> 
            <Spinner animation="grow" role="status"></Spinner>
          </div>
        }
        {
          error && 
          <div className='resultBox'>
            <p className="errorText">{error}</p>
          </div> 
        }
        {
          success && 
          <div className='resultBox' >
            <p className="succesText">{success}</p>
          </div>
        }
      </section>
    </div>
  )
}

const Login = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading ] = useState(false); 
  const { Login } = useAuth()
  const { Formik } = formik;
  const nagivate = useNavigate()
  const schema = yup.object().shape({
    username: yup.string().min(3, 'must be at least 3 characters long').required(),
    password: yup.string().min(6, 'must be at least 6 characters long').required(),
  });
  
  const handleLogin = async (values, { setSubmitting }) => {
    
    setError("")
    setSuccess("")
    setIsLoading(true)
    
    const isLogin = await Login(values.username, values.password)

    if (isLogin) {
      setSuccess("Usuario logeado con éxito")
      setTimeout(() => {
        nagivate("/")
      }, 2000);
      return
    }
    setError("El usuario no existe")
    setIsLoading(false)
  }

  return (
    <div className="reLogin">
      <section>
        <h2>Inicia Sesion</h2>
        <h3>usuario: donero contraseña: ewedon </h3>
        <Formik
          validationSchema={schema}
          onSubmit={handleLogin}
          initialValues={{
            username: '',
            password: '',
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, touched, values, errors }) => (
          <Form className='m-5' onSubmit={handleSubmit} noValidate>
            <Form.Group className="m-3" controlId="validationUsername">
              <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username} 
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="m-3" controlId="validationPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password} 
                isInvalid={touched.password && !!errors.password}

              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Ingresar</Button>
          </Form>)}
        </Formik>
        {
          isLoading && 
          <div className='d-flex justify-content-center item-center m-3'>
            <Spinner animation="grow" role="status"/>
          </div>
        }
        {
          error && 
          <div className='resultBox'>
            <p className="errorText">{error}</p>
          </div> 
        }
        {
          success && 
          <div className='resultBox' >
            <p className="succesText">{success}</p>
          </div>
        }
      </section>
    </div>
  )
}
export {LoginRegister, Register, Login}