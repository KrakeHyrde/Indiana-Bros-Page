import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/loginregi.css"

const LoginRegister = () => {
    return (
        <div className="decision">
            <button className="inicia"><a href="/login">Inicia Secion</a></button>
            <button className="register"><a href="register">Registrate</a></button>
        </div>
    )
}

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!username || !email || !password) {
      setError("Debes completar todos los campos")
      return
    }

    const newUser = {
      username,
      email,
      password
    }

    console.log(newUser)
    setSuccess("Usuario registrado con éxito")

    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="reRegister">
      <h1>Registrate</h1>

      <section>
        <h2>Hola, bienvenido</h2>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" />
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input type="email" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input type="password" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button>Ingresar</button>
        </form>

        {
          error && <p style={{ color: "red" }}>{error}</p>
        }
        {
          success && <p style={{ color: "green" }}>{success}</p>
        }
      </section>
    </div>
  )
}

const Login = () =>{
    return(
        <div className="reLogin">
            <h1>Inicia sesión</h1>
            <section>
                <form>
                <div>
                    <label>Correo electrónico:</label>
                    <input type="email" />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" />
                </div>
                <button>Ingresar</button>
                </form>
            </section>
        </div>
    )
}
export {LoginRegister, Register, Login}