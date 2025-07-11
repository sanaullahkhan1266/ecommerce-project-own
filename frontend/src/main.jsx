import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopProvider from './context/ShopContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Replace with your NEW Google OAuth Client ID
const GOOGLE_CLIENT_ID = "YOUR_NEW_CLIENT_ID_HERE";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ShopProvider>
          <App />
        </ShopProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
