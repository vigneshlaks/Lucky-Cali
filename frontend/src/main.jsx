import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from './components/shared/auth/AuthProvider.jsx'
import { SkillProvider } from './components/shared/SkillContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SkillProvider>
        <App />
      </SkillProvider>
    </AuthProvider>
  </React.StrictMode>,
)
