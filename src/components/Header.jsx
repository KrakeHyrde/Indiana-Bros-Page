import '../styles/Header.css'
import logo from'../assets/logo.jpeg'
function Header() {
    return(
        <div className='pepito'>
            <nav className='header'>
                <div className='navIz'>
                    <img src={logo} className='logo' alt='Logo'/>
                    <button className='inicio'>Inicio</button>
                    <button className='productos'>Productos</button>
                    <button className='info'>Informacion</button>
                </div>
                <div className='navDer'>
                    <button className='login'>Iniciar Sesion</button>
                </div>
            </nav>
        </div>
    )

}
export {Header}