import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Delivery from './pages/Delivery.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Delivery />
  </StrictMode>,
)
