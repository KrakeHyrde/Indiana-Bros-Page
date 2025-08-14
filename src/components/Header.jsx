import logo from'../assets/logo.jpeg'
import { useAuth }  from "../context/UserContext"
import { Link } from 'react-router-dom'
import styles from '../styles/Header.module.css'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { List } from 'lucide-react'

function Header() {
  const {user}  = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const openMenu = () => setShowMenu(true)
  const closeMenu = () => setShowMenu(false)
     return (
    <>
      <header className={styles.pepito}>
        <nav className={styles.header}>
          <div className={styles.navIz}>
            <Link to="/" className='my-1 mx-3'><img src={logo} className={styles.logo} alt='Logo'/></Link>
            <Link to="/productos"><Button className={styles.button}>Productos</Button></Link>
            <Link to="/info"><Button className={styles.button}>Informacion</Button></Link>
          </div>

          {user && (
            <div>
              <Link to={'/dashboard'}><Button className={styles.button}>Dashboard</Button></Link>
            </div>
          )}

          {!user && (
            <div className='navDer'>
              <Link to="/loginregister"><Button className={styles.button}>Iniciar Sesion</Button></Link>
            </div>
          )}

          <button
            type="button"
            className={styles.hamburgerBtn}
            aria-label="Abrir menú"
            onClick={openMenu}
          >
            <List size={24} />
          </button>
        </nav>
      </header>


      <Navbar expand={false}>
        <Offcanvas show={showMenu} onHide={closeMenu} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column" onSelect={closeMenu}>
              <Nav.Item>
                <Link to="/" className={styles.offLink} onClick={closeMenu}>Inicio</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/productos" className={styles.offLink} onClick={closeMenu}>Productos</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/info" className={styles.offLink} onClick={closeMenu}>Información</Link>
              </Nav.Item>

              {user ? (
                <Nav.Item>
                  <Link to="/dashboard" className={styles.offLink} onClick={closeMenu}>Dashboard</Link>
                </Nav.Item>
              ) : (
                <Nav.Item>
                  <Link to="/loginregister" className={styles.offLink} onClick={closeMenu}>Iniciar Sesión</Link>
                </Nav.Item>
              )}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>
    </>
  )
}
export {Header}