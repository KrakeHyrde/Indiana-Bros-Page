import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Inicio} from "../components/Inicio"
import { Producto } from "../components/Producto"
import {LoginRegister} from "../components/Login-Register"
import {Info} from "../components/Info"
import App from "../components/App"
import { ListadeProductos } from "../components/ListadeProductos"

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>           
                <Route path="/" element = {<App/>}/>    
                <Route path="/inicio" element= {<Inicio/>}/>
                <Route path="/productos" element={<ListadeProductos/>}/>
                <Route path="/loginregister" element={<LoginRegister/>}/>
                <Route path="/info" element={<Info/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export {RouterApp}
