import '../styles/Header.css'
import logo from'../assets/logo.jpeg'
function Header() {
    return(
        <header className='header'>
            <div className='navIz'>
                <img src={logo} className='logo' alt='Logo'/>
                <button className='inicio'>Inicio</button>
                <button className='productos'>Productos</button>
                <button className='info'>Informacion</button>
            </div>
            <div className='navDer'>
                <button>Iniciar Sesion</button>
            </div>
        </header>
    )

}
export {Header}