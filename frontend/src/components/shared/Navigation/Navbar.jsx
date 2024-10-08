import React from 'react';
import PropTypes from 'prop-types';
import AnimatedTabs from './MiddleNavigation';
import EndNavigation from './EndNavigation';

const Logo = () => (
  <div className="flex items-center gap-3">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 50 50" 
      className="w-10 h-10"
    >
      <circle 
        cx="25" 
        cy="25" 
        r="23" 
        fill="none" 
        stroke="white" 
        strokeWidth="2"
      />
      <path
        d="M25 10 C20 20, 15 25, 20 35 C22 40, 28 40, 30 35 C35 25, 30 20, 25 10"
        fill="white"
      />
    </svg>
    <span className="text-3xl font-light tracking-wider">lucky cali</span>
  </div>
);

const Navbar = ({ middleTabs, endTabs }) => (
  <div className="bg-black text-white px-4 py-2">
    <div className="container mx-auto grid grid-cols-3 items-center">
      <div className="flex justify-start">
        <Logo />
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
