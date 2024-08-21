import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from './components/shared/auth/AuthProvider.jsx'
import { CompletedSkillsProvider } from './components/shared/skills/SkillProvider.jsx'
import { ToastProvider } from '@/components/ui/toast'; 
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CompletedSkillsProvider>
        <App />
      </CompletedSkillsProvider>
    </AuthProvider>
  </React.StrictMode>,
    
    
)
