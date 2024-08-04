import React from 'react';
import PropTypes from 'prop-types';
import AnimatedTabs from './MiddleNavigation';
import EndNavigation from './EndNavigation';

const Navbar = ({ middleTabs, endTabs }) => {
  return (
    <div className="bg-black text-white px-4 py-2"> 
      <div className="container mx-auto grid grid-cols-3 items-center">
        <div className="flex justify-start">
          <img src="/src/assets/logo.svg" alt="Logo" width='125' />
        </div>
        <div className="flex justify-center"> 
          <AnimatedTabs tabs={middleTabs} />
        </div>
        <div className="flex justify-end">
          <EndNavigation tabs={endTabs} />
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
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

export default Navbar;
