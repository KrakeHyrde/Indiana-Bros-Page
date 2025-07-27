import '../styles/Header.css'
import logo from'../assets/logo.jpeg'
import { useState } from 'react'

function Header() {
    const [user, setUser] = useState(true)
    return(
        <header className='pepito'>
            <nav className='header'>
                <div className='navIz'>
                    <a href="/"><img src={logo} className='logo' alt='Logo'/></a>
                    {
                    user && <>
                        
                        <button className='productos'><a href="/productos">Productos</a></button>
                        <button className='info'><a href="/info">Informacion</a></button>
                        
                    </>
                    }                
                </div>
                {
                user && <div className='navDer'>
                        <button className='login'><a href="/dashboard">Dashboard</a></button>
                </div>
                }
                {
                !user && <div className='navDer'>

                    <button className='login'><a href="loginregister">Iniciar Sesion</a></button>
                </div>
                }
            </nav>
        </header>
    )
}
export {Header}