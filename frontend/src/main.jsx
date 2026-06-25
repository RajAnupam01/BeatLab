import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/authContext.jsx';
import { SongProvider } from './contexts/songContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SongProvider>
           <App />
      </SongProvider>
    </AuthProvider>
  </StrictMode>,
)
