import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from './context/Firebase'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        {/* the app component is wrapped around 2 wrappers */}
        <App />   
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
)
