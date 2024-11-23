import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Attendance from './Attendance.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Attendance />
  </StrictMode>,
)
