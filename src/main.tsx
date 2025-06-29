import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext'
import UserHeader from './components/UserHeader'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <UserHeader/>
      <App />
    </UserProvider>
  </StrictMode>,
)
