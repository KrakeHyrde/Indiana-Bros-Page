import '../styles/Header.css'
import logo from'../assets/logo.jpeg'
function Header() {
    return(
        <header className='pepito'>
            <nav className='header'>
                <div className='navIz'>
                    <a href="/"><img src={logo} className='logo' alt='Logo'/></a>
                    <button className='inicio'><a href="/inicio">Inicio</a></button>
                    <button className='productos'><a href="/productos">Productos</a></button>
                    <button className='info'><a href="/info">Informacion</a></button>
                </div>
                <div className='navDer'>
                    <button className='login'><a href="loginregister">Iniciar Sesion</a></button>
                </div>
            </nav>
        </header>
    )
}
export {Header}