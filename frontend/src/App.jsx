import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLocation, useOutlet, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/shared/Navigation/Navbar';
import FlowDiagram from './components/train/skillTree/Landing';
import ErrorPage from './pages/ErrorPage';
import InnerFlowDiagram from './components/train/skillTree/innerSkillTree/Switch';
import RegisterPage from './pages/Register';
import LoginPage from './pages/LoginPage';
import { competeMiddleTabs, trainMiddleTabs, competeDefaultEndTabs, trainDefaultEndTabs, trainAuthEndTabs, competeAuthEndTabs} from './components/shared/Tabs';
import PostsPage from './pages/PostsPage';
import WorkoutLogPage from './pages/WorkoutLogPage';
import ContestPage from './components/compete/pages/Homepage';
import TrainHomePage from './components/train/Pages/HomePage';
import CalisthenicsProfile from './pages/ProfilePage';
import { useAuth } from './components/shared/auth/AuthProvider';
import ProtectedRoute from './components/shared/auth/ProtectedRoute';
import LeadboardPage from './pages/LeadboardPage';
import PostDetailsPage from './pages/PostDetailsPage';
import LogDetailsPage from './pages/LogDetailsPage';
import LandingPage from './pages/LandingPage';

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

const layoutConfig = {
  train: {
    path: '/train',
    middleTabs: trainMiddleTabs,
    getEndTabs: (isAuthenticated) => isAuthenticated ? trainAuthEndTabs : trainDefaultEndTabs,
  },
  compete: {
    path: '/compete',
    middleTabs: competeMiddleTabs,
    getEndTabs: (isAuthenticated) => isAuthenticated ? competeAuthEndTabs : competeDefaultEndTabs,
  },
};

//Dynamically create navbar depending on login
const LayoutWithNavbar = () => {
  const { token } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!token;

  const getCurrentLayout = () => {
    return Object.values(layoutConfig).find(config => location.pathname.startsWith(config.path)) || layoutConfig.train;
  };

  const currentLayout = getCurrentLayout();

  return (
    <div className="">
      <Navbar 
        className="dark"
        middleTabs={currentLayout.middleTabs} 
        endTabs={currentLayout.getEndTabs(isAuthenticated)} 
        
      />
      <div className="flex-1 overflow-auto">
        <AnimatedOutlet className="" tabs={currentLayout.middleTabs} />
      </div>
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
    path:'',
    element: <LandingPage />
  },
  {
    path: '/train',
    element: <LayoutWithNavbar middleTabs={trainMiddleTabs} endTabs={trainDefaultEndTabs} />,
    children: [
      { index: true, element: <TrainHomePage /> },
      { path: 'flowdiagram', element: <FlowDiagram /> },
      { path: 'flowdiagram/:nodeid', element: <InnerFlowDiagram /> },
      { path: 'posts', element: <PostsPage /> },
      { path: 'posts/:id', element: <PostDetailsPage /> }, 
      { path: 'logs', element: <WorkoutLogPage /> },
      { path: 'logs/:id', element: <LogDetailsPage /> },
      { path: 'profile', element: <ProtectedRoute> <CalisthenicsProfile /> </ProtectedRoute>}
    ],
  },
  {
    path: '/compete',
    element: <LayoutWithNavbar middleTabs={competeMiddleTabs} endTabs={competeDefaultEndTabs} />,
    children: [
      { index: true, element: <ContestPage /> },
      { path: 'contest', element: <ContestPage /> },
      { path: 'leaderboard', element: <LeadboardPage />}
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
