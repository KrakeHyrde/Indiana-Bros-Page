import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserProvider = (props) => {
  const [user, setUser] = useState(true)
  const [registeredUser, setRegisteredUser] = useState(false)
  
  const Login = async (username, password) => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    if (response.ok) {
      const token = await response.json()
      setUser(true)
      return token
    } else {
      return false
    }
  }
  const Register = async (username, email, password) => {
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    if (response.ok) {
      const token = await response.json()
      setRegisteredUser(true)
      setUser(true)
      return token
    } else {
      return false
    }
  }

  const Logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={
      { 
        Login, 
        Register, 
        Logout, 
        user 
      }
    }>
      {props.children}
    </UserContext.Provider>
  )
}

const useAuth = () => useContext(UserContext)

export { UserProvider, useAuth}