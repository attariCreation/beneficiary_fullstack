import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster as SonnerToaster } from 'sonner'
import HotToaster from './components/ui/HotToaster.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider >
        <App />
      <SonnerToaster richColors position="top-center" />
      <HotToaster 
      position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
           removeDelay: 1000,
           style: {
            background: '#363636',
            color: '#fff',
           }
        }}
      />

         </AuthProvider>
         
    </BrowserRouter>
  </StrictMode>,
)
