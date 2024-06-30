import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLocation, useOutlet, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {useState, useReducer, useEffect} from 'react';
import Navbar from './components/Navigation/Navbar';
import HomePage from './pages/HomePage';
import FlowDiagram from './components/flowDiagrams/Landing';
import ErrorPage from './pages/ErrorPage';
import InnerFlowDiagram from './components/flowDiagrams/Switch';
import RegisterPage from './pages/Register';
import LoginPage from './pages/LoginPage';
import TimelinePage from './pages/TimelinePage';
import tabs from './components/Navigation/Tabs';



const pageVariants = {
  initialRight: {
    opacity: 0,
    x: "-100%",  // Start off-screen to the right
  },
  in: {
    opacity: 1,
    x: 0,       // Enter on-screen
  },
  initialLeft: {
    opacity: 0,
    x: "100%",  // Start off-screen to the left
  },
};

const findTabIndex = (path) => {
  return tabs.findIndex(tab => tab.path === path);
};

const initialState = {
  prevIndex: findTabIndex(window.location.pathname),
  direction: 'right',
  changeDirection: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DIRECTION':
      return {
        ...state,
        direction: action.direction,
        prevIndex: action.currentIndex,
        changeDirection: true,
      };
    case 'DISABLE_DIRECTION':
      return {
        ...state,
        changeDirection: false,
      };
    default:
      return state;
  }
};

const AnimatedOutlet = () => {
  const location = useLocation();
  const element = useOutlet();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const currentIndex = findTabIndex(location.pathname);

    if (currentIndex !== -1 && state.prevIndex !== -1) {
      if (currentIndex !== state.prevIndex) {
        dispatch({
          type: 'SET_DIRECTION',
          direction: currentIndex > state.prevIndex ? 'right' : 'left',
          currentIndex,
        });
      }
    } else {
      dispatch({ type: 'DISABLE_DIRECTION' });
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {element && state.changeDirection ? (
        <motion.div
          key={location.pathname}
          initial={state.direction === 'right' ? 'initialRight' : 'initialLeft'}
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{
            type: 'spring',
            ease: 'easeIn',
            duration: 0.6,
          }}
        >
          {element}
        </motion.div>
      ) : (
        <div key={location.pathname}>{element}</div>
      )}
    </AnimatePresence>
  );
};


const LayoutWithNavbar = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <AnimatedOutlet />
    </div>
  );
};

const LayoutWithoutNavbar = () => (
  <div className="layout-container">
      <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithNavbar />,
    children: [
      { 
        index: true, 
        element: 
          <HomePage />
         },
      { path: 'flowdiagram', element: <FlowDiagram /> },
      { path: 'flowdiagram/:nodeid', element: <InnerFlowDiagram /> },
      { path: 'timeline', element: <TimelinePage /> },
    ],
  },
  {
    path: 'auth',
    element: <LayoutWithoutNavbar />,
    children: [
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
