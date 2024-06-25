import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import HomePage from './pages/HomePage';
import FlowDiagram from './components/flowDiagrams/Landing';
import ErrorPage from './pages/ErrorPage';
import InnerFlowDiagram from './components/flowDiagrams/Switch';
import RegisterPage from './pages/Register'; 

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithNavbar />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "flowdiagram",
        element: <FlowDiagram />,
      },
      {
        path: "flowdiagram/:nodeid",
        element: <InnerFlowDiagram />
      }
    ],
  },
  {
    path: "auth",
    element: <LayoutWithoutNavbar />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <RegisterPage />,
      }
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;