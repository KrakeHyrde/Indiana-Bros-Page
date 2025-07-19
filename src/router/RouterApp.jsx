import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Inicio} from "../components/Inicio"
import {Productos} from "../components/Productos"
import {LoginRegister} from "../components/Login-Register"
import {Info} from "../components/Info"
import App from "../components/App"

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>           
                <Route path="/" element = {<App/>}/>    
                <Route path="/inicio" element= {<Inicio/>}/>
                <Route path="/productos" element={<Productos/>}/>
                <Route path="/loginregister" element={<LoginRegister/>}/>
                <Route path="/info" element={<Info/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export {RouterApp}