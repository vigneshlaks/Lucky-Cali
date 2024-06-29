import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import HomePage from './pages/HomePage';
import FlowDiagram from './components/flowDiagrams/Landing';
import ErrorPage from './pages/ErrorPage';
import InnerFlowDiagram from './components/flowDiagrams/Switch';
import RegisterPage from './pages/Register';
import LoginPage from './pages/LoginPage';
import TimelinePage from './pages/TimelinePage';

const LayoutWithNavbar = () => (
  <div className="layout-container">
    <Navbar />
    <div className="content">
      <Outlet />
    </div>
  </div>
);

const LayoutWithoutNavbar = () => (
  <div className="layout-container">
    <div className="content">
      <Outlet />
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithNavbar />}>
          <Route index element={<HomePage />} />
          <Route path="flowdiagram" element={<FlowDiagram />} />
          <Route path="flowdiagram/:nodeid" element={<InnerFlowDiagram />} />
          <Route path="timeline" element={<TimelinePage />} />
        </Route>
        <Route path="auth" element={<LayoutWithoutNavbar />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;
