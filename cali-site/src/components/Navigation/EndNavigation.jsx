import React from 'react';
import ShinyButton from './ShinyButton';

const EndNavigation = () => {
  return (
    <div className="flex space-x-4"> {/* Add flex and space-x-4 for spacing */}
      <ShinyButton text="Sign In" to="/auth/login" />
      <ShinyButton 
        text="Compete" 
        to="/compete" 
        backgroundColor="bg-red-500" 
        textColor="text-red" 
        maskColor="linear-mask"
      />
      <ShinyButton 
        text="Spectate" 
        to="/spectate" 
        backgroundColor="bg-blue-500" 
        textColor="text-blue" 
        maskColor="linear-mask"
      />
    </div>
  );
};

export default EndNavigation;
