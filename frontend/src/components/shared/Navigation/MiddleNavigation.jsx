import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function AnimatedTabs({ tabs }) {
  const location = useLocation();

  const findMatchingTab = (pathname) => {
    let currentTab = tabs.find((tab) => tab.path === pathname);

    if (!currentTab) {
      const pathSegments = pathname.split('/');
      while (pathSegments.length > 1 && !currentTab) {
        pathSegments.pop();
        const partialPath = pathSegments.join('/');
        currentTab = tabs.find((tab) => tab.path === partialPath);
      }
    }

    return currentTab ? currentTab.id : tabs[0].id;
  };

  const [activeTab, setActiveTab] = useState(() => findMatchingTab(location.pathname));

  useEffect(() => {
    setActiveTab(findMatchingTab(location.pathname));
  }, [location.pathname]);

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <Link key={tab.id} to={tab.path}>
          <button
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? "" : "hover:text-white/60"
            } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-white mix-blend-difference"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </button>
        </Link>
      ))}
    </div>
  );
}

AnimatedTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AnimatedTabs;
