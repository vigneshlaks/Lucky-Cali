import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';

const EndNavigation = ({ tabs }) => {
  const colorGroups = {
    group1: ['signin', 'train'],
    group2: ['compete'],
    group3: ['guide']
  };

  const getColor = (tabId) => {
    if (colorGroups.group3.includes(tabId)) return 'ringHoverBlue';
    if (colorGroups.group2.includes(tabId)) return 'ringHoverRed';
    return 'ringHover';
  };

  return (
    <div>
      {tabs.map((tab) => {
        return (
          <Button 
            key={tab.id} 
            variant={getColor(tab.id)} 
            className="font-normal mr-2" 
            size="sm"
          >
            <Link to={tab.path}>
              {tab.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

EndNavigation.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EndNavigation;
