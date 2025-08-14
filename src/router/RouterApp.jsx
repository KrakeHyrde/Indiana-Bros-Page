import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Inicio} from "../components/Inicio"
import { Producto } from "../components/Producto"
import {LoginRegister, Register, Login} from "../components/Login-Register"
import {Info} from "../components/Info"
import App from "../components/App"
import { ListadeProductos } from "../components/ListadeProductos"
import { Dashboard } from "../components/Dashboard"
import { Header } from "../components/Header"

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>           
                <Route path="/" element = {<App/>}/>    
                <Route path="/dashboard" element= {<Dashboard/>} />         
                <Route path="/productos" element={<Producto/>}/>
                <Route path="/loginregister" element={<LoginRegister/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/info" element={<Info/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export {RouterApp}
