import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './styles/shell.css'
import './styles/home.css'
import './styles/about.css'
import './styles/work-process.css'
import './styles/services.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
