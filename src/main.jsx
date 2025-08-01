import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './Routes'

createRoot(document.getElementById('root')).render(
  <>
    <AppRoutes />
  </>
)
