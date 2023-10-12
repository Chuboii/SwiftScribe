import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ErrProvider} from "/src/context/ErrContext"
import {UserProvider} from "/src/context/UserContext"
import { BrowserRouter } from "react-router-dom";
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <ErrProvider>
  <UserProvider>
      <App />
      </UserProvider>
      </ErrProvider>
      </BrowserRouter>
  </React.StrictMode>
)
