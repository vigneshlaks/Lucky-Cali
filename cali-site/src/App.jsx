import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLocation, useOutlet, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/shared/Navigation/Navbar';
import FlowDiagram from './components/train/flowDiagrams/Landing';
import ErrorPage from './pages/ErrorPage';
import InnerFlowDiagram from './components/train/flowDiagrams/Switch';
import RegisterPage from './pages/Register';
import LoginPage from './pages/LoginPage';
import TimelinePage from './pages/TimelinePage';
import { competeMiddleTabs, trainMiddleTabs, competeEndTabs, trainEndTabs } from './components/shared/Tabs';
import PostsPage from './pages/PostsPage';
import WorkoutLogPage from './pages/WorkoutLogPage';
import ContestPage from './components/compete/pages/Homepage';
import TrainHomePage from './components/train/Pages/HomePage';
import Custompage from './components/compete/pages/CustomPage';

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

const findTabIndex = (tabs, path) => {
  return tabs.findIndex(tab => tab.path === path);
};

const initialState = {
  prevIndex: findTabIndex(trainMiddleTabs, window.location.pathname),
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

const AnimatedOutlet = ({ tabs }) => {
  const location = useLocation();
  const element = useOutlet();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const currentIndex = findTabIndex(tabs, location.pathname);

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
  }, [location.pathname, tabs]);

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

AnimatedOutlet.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const LayoutWithNavbar = ({ middleTabs, endTabs }) => {
  return (
    <div >
      <Navbar className="dark" middleTabs={middleTabs} endTabs={endTabs} />
      <AnimatedOutlet className="dark" tabs={middleTabs} />
    </div>
  );
};

LayoutWithNavbar.propTypes = {
  middleTabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  endTabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const LayoutWithoutNavbar = () => (
  <div className="layout-container">
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/train',
    element: <LayoutWithNavbar middleTabs={trainMiddleTabs} endTabs={trainEndTabs} />,
    children: [
      { index: true, element: <TrainHomePage /> },
      { path: 'flowdiagram', element: <FlowDiagram /> },
      { path: 'flowdiagram/:nodeid', element: <InnerFlowDiagram /> },
      { path: 'timeline', element: <TimelinePage /> },
      { path: 'posts', element: <PostsPage /> },
      { path: 'logs', element: <WorkoutLogPage /> }
    ],
  },
  {
    path: '/compete',
    element: <LayoutWithNavbar middleTabs={competeMiddleTabs} endTabs={competeEndTabs} />,
    children: [
      { index: true, element: <ContestPage /> },
      { path: 'contest', element: <ContestPage /> },
      { path: 'custom', element: <Custompage /> },
    ],
  },
  {
    path: '/auth',
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
