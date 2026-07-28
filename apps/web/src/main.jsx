import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './styles/shell.css'
import './styles/components.css'
import './styles/home.css'
import './styles/about.css'
import './styles/work-process.css'
import './styles/services.css'
import './styles/projects.css'
import './styles/project-detail.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
