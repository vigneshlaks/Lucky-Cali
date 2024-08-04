import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from './components/shared/auth/AuthProvider.jsx'
import { CompletedSkillsProvider } from './components/shared/skills/SkillProvider.jsx'
import { ObjectivesProvider } from './components/shared/ObjectivesProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CompletedSkillsProvider>
        <ObjectivesProvider>
          <App />
        </ObjectivesProvider>
      </CompletedSkillsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
