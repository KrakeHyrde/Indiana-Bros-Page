import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { Header } from './components/Header.jsx'
import { RouterApp } from './router/RouterApp.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/responsive.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <Header/>   
    <RouterApp/>
  </StrictMode>,
)
