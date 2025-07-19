import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './components/App.jsx'
import { Header } from './components/Header.jsx'
import { RouterApp } from './router/RouterApp.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <Header/>   
    <RouterApp/>
  </StrictMode>,
)
